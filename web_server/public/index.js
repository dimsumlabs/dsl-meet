(function () {
    "use strict";

    function notifyIrcOfNewParticipant(newDisplayName) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://localhost/irc", true);
        xhr.send(`${newDisplayName} joined ${server}`);
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
    notifyIrcOfNewParticipant(displayName);
    api.addListener("participantJoined", function (participant) {
        notifyIrcOfNewParticipant(participant.displayName);
    });
}());
