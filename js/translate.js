document.addEventListener("DOMContentLoaded", function () {
    let tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.background = "#000";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "14px";
    tooltip.style.display = "none";
    tooltip.style.pointerEvents = "none";
    document.body.appendChild(tooltip);
  
    async function translateText(text, targetLang) {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        return result[0].map((item) => item[0]).join(" ");
      } catch (error) {
        console.error("Translation Error:", error);
        return "Translation Failed";
      }
    }
  
    async function handleHover(event) {
      let targetElement = event.target;
  
      // Find the nearest valid text-containing element
      while (targetElement && !targetElement.innerText.trim()) {
        targetElement = targetElement.parentElement;
      }
  
      if (!targetElement) return;
  
      const originalText = targetElement.innerText.trim();
      if (!originalText) return;
  
      // Translate and show tooltip
      const translatedText = await translateText(originalText, "hi"); // Change "hi" to another language code
      tooltip.innerText = translatedText;
      tooltip.style.display = "block";
  
      // Position tooltip near the cursor
      document.addEventListener("mousemove", function moveTooltip(e) {
        tooltip.style.left = e.pageX + 10 + "px";
        tooltip.style.top = e.pageY + 10 + "px";
      });
  
      // Hide tooltip on mouse leave
      targetElement.addEventListener("mouseleave", function hideTooltip() {
        tooltip.style.display = "none";
        targetElement.removeEventListener("mouseleave", hideTooltip);
      });
    }
  
    document.body.addEventListener("mouseover", handleHover);
  });
//Hindi → "hi"
//Tamil → "ta"
//Bengali → "bn"
//Marathi → "mr"
//Telugu → "te"
//Gujarati → "gu"