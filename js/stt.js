document.addEventListener("DOMContentLoaded", function () {
    let recognition;
    let activeInput = null;
  
    // Check if the browser supports Speech Recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
  
      // When speech is recognized, insert it into the active input field
      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        if (activeInput) {
          activeInput.value += transcript + " "; // Append recognized text
        }
      };
  
      recognition.onerror = function (event) {
        console.error("Speech Recognition Error:", event.error);
        alert("Speech recognition error: " + event.error);
      };
    } else {
      console.warn("Speech Recognition not supported in this browser.");
      alert("Speech-to-Text is not supported in this browser. Please use Google Chrome.");
    }
  
    // Function to start speech recognition when clicking on input fields
    function enableSpeechToText(event) {
      if (!recognition) return;
  
      activeInput = event.target;
      recognition.start();
    }
  
    // Attach event listeners to all input fields and textareas
    document.querySelectorAll("input[type='text'], textarea").forEach((element) => {
      element.addEventListener("focus", enableSpeechToText);
    });
  });
  