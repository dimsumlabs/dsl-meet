(function () {
    "use strict";

    function notifyIrcOfParticipantAction(displayName, actionText) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://localhost/irc", true);
        xhr.send(`${displayName} ${actionText} ${server}`);
    }

    const domain = "meet.jit.si";
    const roomName = "DimSumLabs";
    const server = `https://${domain}/${roomName}`;
    const displayName = "Electro Lab";
    const options = {
        roomName: "DimSumLabs",
        width: "100%",
        height: "100%",
        parentNode: document.querySelector("#meet"),
        userInfo: {
            displayName: displayName
        },
        configOverwrite: {
            prejoinPageEnabled: false // to join automatically
        }
    };
    const api = new JitsiMeetExternalAPI(domain, options);
    notifyIrcOfParticipantAction(displayName, "joined");
    api.addListener("participantJoined", function (participant) {
        notifyIrcOfParticipantAction(participant.displayName, "joined");
    });
    api.addListener("participantLeft", function (participant) {
        notifyIrcOfParticipantAction(participant.displayName, "left");
    });
}());
