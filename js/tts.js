document.addEventListener("DOMContentLoaded", function () {
    let isTTSActive = false;
    let lastSpokenText = "";
  
    // Function to enable or disable TTS
    function toggleTTS() {
      isTTSActive = !isTTSActive;
      localStorage.setItem("ttsEnabled", isTTSActive); // Save state across pages
      updateToggleUI();
    }
  
    // Function to update the toggle button's appearance
    function updateToggleUI() {
      const toggleButton = document.getElementById("tts-toggle");
      if (toggleButton) {
        toggleButton.innerText = isTTSActive ? "TTS: ON 🔊" : "TTS: OFF 🔇";
      }
    }
  
    // Function to convert text to speech
    function convertTextToSpeech(text) {
      if (!isTTSActive || !text.trim() || text === lastSpokenText) return;
      lastSpokenText = text;
  
      try {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        synth.speak(utterance);
      } catch (error) {
        console.error("Error converting text to speech:", error);
      }
    }
  
    // Function to handle text hover
    function handleHover(event) {
      if (!isTTSActive) return;
  
      let targetElement = event.target;
  
      // Find the nearest valid text-containing element
      while (targetElement && !targetElement.innerText?.trim()) {
        targetElement = targetElement.parentElement;
      }
  
      if (!targetElement) return; // Ignore if no valid element found
  
      const validTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "A", "SPAN", "BUTTON", "LABEL"];
      if (!validTags.includes(targetElement.tagName)) return;
  
      let text = targetElement.innerText?.trim();
      if (text && text.length > 0) {
        convertTextToSpeech(text);
      }
    }
  
    // Load TTS state from localStorage (to keep toggle state across pages)
    if (localStorage.getItem("ttsEnabled") === "true") {
      isTTSActive = true;
    }
  
    // Update UI based on stored toggle state
    updateToggleUI();
  
    // Attach hover listener to the whole page
    document.body.addEventListener("mouseover", handleHover);
  
    // Attach click event to toggle button (if it exists)
    document.getElementById("tts-toggle")?.addEventListener("click", toggleTTS);
  });
  