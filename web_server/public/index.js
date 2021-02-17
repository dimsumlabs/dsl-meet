/*jslint browser: true, maxlen: 80 */

/*global JitsiMeetExternalAPI*/

(function () {
    "use strict";

    const domain = "meet.jit.si";
    const roomName = "DimSumLabs";
    const server = `https://${domain}/${roomName}`;
    const myDisplayName = "Electro Lab";
    const displayNames = {}; // need to be memorized for notification
                             // when participant left

    function notifyIrcOfParticipantAction(displayName, actionText) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://localhost/irc", true);
        xhr.send(`${displayName} ${actionText} ${server}`);
    }

    const options = {
        roomName: "DimSumLabs",
        width: "100%",
        height: "100%",
        parentNode: document.querySelector("#meet"),
        userInfo: {
            displayName: myDisplayName
        },
        configOverwrite: {
            prejoinPageEnabled: false // to join automatically
        }
    };

    const api = new JitsiMeetExternalAPI(domain, options);
    notifyIrcOfParticipantAction(myDisplayName, "joined");
    api.addListener("participantJoined", function (participant) {
        var displayName = participant.displayName;
        if (displayName === myDisplayName) {
            // After starting up, the event for self join sometimes
            // triggers, sometimes not. So we just ignore it.
            return;
        }
        displayNames[participant.id] = displayName;
        notifyIrcOfParticipantAction(
            participant.displayName,
            "joined"
        );
    });
    api.addListener("participantLeft", function (participant) {
        // api.getDisplayName() is not able to provide the display
        // name from the participant ID anymore. It's gone.
        const displayName = displayNames[participant.id];
        notifyIrcOfParticipantAction(displayName, "left");
    });
}());
