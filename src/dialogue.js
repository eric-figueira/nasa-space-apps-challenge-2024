export function displayDialog(text, onDisplayEnd) {
  const ui       = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const close    = document.getElementById("close");

  ui.style.display = "block";

  let index = 0;
  let current = "";
  const invervalRef = setInterval(() => {
    if (index < text.length) {
      current += text[index];
      dialogue.innerHTML = current;
      index++;
      return;
    }

    clearInterval(invervalRef);
  }, 5);

  function handleClose() {
    onDisplayEnd();
    ui.style.display = "none";
    dialogue.innerHTML = "";

    clearInterval(invervalRef);
    close.removeEventListener("click", handleClose);
  }

  close.addEventListener("click", handleClose);
}

export function displayConversation(conversation, onConversationEnd) {
  const ui       = document.getElementById("conversation-container");
  const dialogue = document.getElementById("conversation-dialogue");
  const next     = document.getElementById("next");

  ui.style.display = "block";

  let textIndex = 0;

  function displayText(text) {
    let index = 0;
    let current = "";

    const invervalRef = setInterval(() => {
      if (index < text.length) {
        current += text[index];
        dialogue.innerHTML = current;
        index++;
        return;
      }
  
      clearInterval(invervalRef);
    }, 5);
  }

  function handleNext() {
    dialogue.innerHTML = "";
    
    textIndex++;
    if (textIndex === conversation.length) {
      ui.style.display = "none";
      dialogue.innerHTML = "";

      onConversationEnd();
      return;
    }
    
    if (textIndex < conversation.length)
      displayText(conversation[textIndex]);
  }

  if (textIndex < conversation.length)
    displayText(conversation[textIndex]);

  next.addEventListener("click", handleNext);
}