const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
    bodyEl: document.body
};

let intervalId = null;

refs.startBtnEl.addEventListener('click', startChangeColorBody);

refs.stopBtnEl.addEventListener('click', stopChangeColorBody);


function startChangeColorBody() {
    refs.startBtnEl.disabled = true;
    if (!intervalId) {
        intervalId = setInterval(() => {
            refs.bodyEl.style.backgroundColor = getRandomHexColor()
        }, 1000);
    }
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  function stopChangeColorBody() {
    refs.startBtnEl.disabled = false;
    if(intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        refs.bodyEl.style.backgroundColor = "#FFFFFF";
    }
  }




