import "fetch-headers";
import express from "express";
import Replicate from "replicate";
import fetch from "node-fetch-ponyfill";
// import fetch from "node-fetch";
global.fetch = fetch;

const app = express();
const port = 3000; // You can use any available port

const replicate = new Replicate({
    auth: 'r8_Vdzl2SE8fN2qJuOczQjXZZUq5jm4cMx4LM4lO',// replicate api token
});

// replicate model for music generation
const model = "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906";

app.use(express.json());
app.use(express.static("public"));

//calling post api for generate music
app.post("/generate-audio", async (req, res) => {
    try {
        // const prompt = req.body.prompt;
        
        // const text = { prompt };
        const output = await replicate.run
        (
            model, 
            {
                input: {
                    model_version: "melody",
                    prompt: req.body.prompt, // prompt for generate music
                    duration: 28 // length of generated audio
                  }
            }
            
        );

        // Update this part based on the actual response structure from Replicate
        // const audioUrl = output.audioUrl; // Assuming this is correct
        const audioUrl = output;
        // the audio URL to the console for debugging
        console.log("Generated Audio URL:", audioUrl);

        res.json({ audioUrl });
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
