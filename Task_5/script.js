const wsUrl = "wss://echo-ws-service.herokuapp.com/";

const outputRequest = document.querySelector(".content__request");
const outputResponse = document.querySelector(".content__response");
const btnSend = document.querySelector('.btnSend');
const btnGeo = document.querySelector('.btnGeo');
const content = document.querySelector('.content');
const inputValue = document.querySelector('.inputValue');

function writeToScreenRequest(message) {
  let pre = document.createElement("p");
  pre.className = "content__request";
  pre.innerHTML = message;
  content.append(pre);
}
function writeToScreenResponse(message) {
  let pre = document.createElement("p");
  pre.className = "content__response";
  pre.innerHTML = message;
  content.append(pre);
}

function writeToScreenGeo(lat,long) {
  let pre = document.createElement("a");
  pre.className = "content__response";
  pre.textContent = "Гео-локация";
  pre.target='_blank';
  pre.href = `https://www.openstreetmap.org/#map=18/${lat}/${long}`;
  content.append(pre);
}

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreenGeo(latitude,longitude) 
};


btnSend.addEventListener('click', () => {
  websocket = new WebSocket(wsUrl);
  websocket.onmessage = function(evt) {
    writeToScreenResponse(evt.data);
  };
  const message = inputValue.value;
  writeToScreenRequest(message);
  let requestMsg = () => websocket.send(message);
  setTimeout (requestMsg,1000);

});


btnGeo.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(success);
});