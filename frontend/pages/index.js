import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Home() {

  const [voice, setVoice] = useState('');
  const [text, setText] = useState('');
  const [voiceError, setVoiceError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [audio, setAudio] = useState('');
  const loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  function handleSelectChange(e) {
    setVoice(e.target.value);
  }
  
  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    setTextError(false);
    setVoiceError(false);

    if (voice == '') {
      setVoiceError(true);
    } else if (text == "") {
      setTextError(true);
    } else {
      let voiceQueryParam = voice.replace(/\s+/g, "-");
      fetch(`http://127.0.0.1:8000/to-speech/convert?voice=${voice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
        .then((response) => response.blob()) // Get the response as a Blob
        .then((blob) => {
          // Create a URL for the Blob object
          const url = URL.createObjectURL(blob);
          // Create an <audio> element to play the MP3 file
          const audio = new Audio(url);
          // Play the audio
          setSuccess(true);
          setAudio(audio)
        })
        .catch((error) => {
          // Handle any errors
          setSuccess(false);
          setErrorMessage(error.toString());
          console.log(error)
        });
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#36ba01",
      },
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#36ba01", // Set the desired text color for InputLabel
            fontFamily: "monospace, sans-serif", // Set the desired font family for InputLabel
            "&.Mui-focused": {
              color: "#36ba01", // Set the color of InputLabel when focused
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: "#36ba01", // Set the background color when Select is focused
            fontFamily: "monospace, sans-serif", // Set the desired font family for InputLabel
            "&:before": {
              borderColor: "#36ba01", // Set the color of the border before Select
            },
            "&:after": {
              borderBottomColor: "#36ba01", // Set the color of the bottom border
            },
            "& svg": {
              fill: "#36ba01", // Set the color of the down arrow icon
            },
          },
          select: {
            "&:focus": {
              color: "#36ba01", // Set the background color when Select is focused
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#36ba01", // Set the color of the text
            fontFamily: "monospace, sans-serif", // Set the desired font family for InputLabel
          },
          notchedOutline: {
            borderColor: "#36ba01", // Set the color of the border
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen font-custom bg-secondary text-primary">
      <h1 className="text-3xl mb-16">Convert text to speech</h1>
      <div className="flex flex-col items-center p-8 gap-y-8 h-3/4 w-3/4 border-2 border-primary">
        <div className="flex flex-col w-11/12 justify-center h-full">
          <p className="text-lg pl-1 text-center mb-4">Choose voice:</p>
          <div className="w-full flex items-center justify-center">
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  minWidth: 120,
                }}
              >
                <FormControl
                  fullWidth
                  required
                  error={voiceError ? true : false}
                  variant="standard"
                  color="primary"
                >
                  <InputLabel id="demo-simple-select-label" color="primary">
                    Voice
                  </InputLabel>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={voice}
                    onChange={(e) => handleSelectChange(e)}
                    color="primary"
                  >
                    <MenuItem value={"Male US"}>Male US</MenuItem>
                    <MenuItem value={"Female US"}>Female US</MenuItem>
                    <MenuItem value={"Male GB"}>Male UK</MenuItem>
                    <MenuItem value={"Female GB"}>Female UK</MenuItem>
                  </Select>
                  {/* <FormHelperText>Required</FormHelperText> */}
                </FormControl>
              </Box>
            </ThemeProvider>
          </div>
          <p className="text-lg pl-1 mt-12 text-center caret-white mb-4">
            Enter text:
          </p>
          <ThemeProvider theme={theme}>
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={8}
              placeholder={loremIpsum}
              variant="outlined"
              color="primary"
              value={text}
              error={textError ? true : false}
              onChange={(e) => handleTextChange(e)}
            />
          </ThemeProvider>
          <div className="flex flex-col items-center justify-center">
            {success ? (
              <div className="mt-16">
                <audio
                  src={audio.src}
                  controls
                />
              </div>
            ) : (
              <div className="mt-16 text-red-600">{errorMessage}</div>
            )}
            <button
              className="border border-primary rounded-md min-h-[50px] w-1/2 mt-16 hover:bg-primary hover:text-secondary hover:font-bold"
              onClick={handleSubmit}
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
