document.addEventListener("DOMContentLoaded", function () {
    const generationForm = document.getElementById("generationForm");
    const promptInput = document.getElementById("prompt");
    const audioPlayer = document.getElementById("audioPlayer");

    generationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const prompt = promptInput.value;
        if (prompt) {
            const response = await generateAudio(prompt);
            if (response && response.audioUrl) {
                audioPlayer.src = response.audioUrl;
                audioPlayer.play();
            }
        }
    });

    async function generateAudio(prompt) {
        try {
            const response = await fetch("/generate-audio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });
            return response.json();
        } catch (error) {
            console.error("Error generating audio:", error);
        }
    }
});
