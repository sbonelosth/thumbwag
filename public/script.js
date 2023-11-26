const socket = io();
const msgs = document.getElementById("msgs");
const form = document.getElementById("form");
const input = document.getElementById("msg-input");
const msgscontainer = document.getElementById("msgs-container");

const userName = prompt("Enter your name");

socket.emit("user:join", (userName === "") ? `user ${socket.id}`: userName);

socket.on("global:message", msg => {
    msgs.innerHTML += `<p class="join-msg">${msg}</p>`;
});

form.addEventListener("submit", e => {
    e.preventDefault();

    let now = new Date().toLocaleTimeString('it-IT').slice(0, 5);
    msgs.innerHTML += `
    <div class="sent-msg-container">
        <p class="sent-msg">${input.value}</p>
    </div>
    <p class="your-name">${now} - You</p>
    `;
    socket.emit("message:send", { name:userName, message:input.value});
    input.value = "";
    msgscontainer.scrollTo(0, msgscontainer.scrollHeight);
});

socket.on("message:receive", payload => {
    let now = new Date().toLocaleTimeString('it-IT').slice(0, 5);
    msgs.innerHTML += `
    <div class="received-msg-container">
        <p class="received-msg">${payload.message}</p>
    </div>
    <p class="received-name">${(payload.name === "") ? `user ${payload.id}` : payload.name} - ${now}</p>
    `;
    msgscontainer.scrollTo(0, msgscontainer.scrollHeight);
})
 