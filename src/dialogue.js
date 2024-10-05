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