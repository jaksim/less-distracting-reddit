function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        color: document.querySelector("#option").value
    });
}

function loadOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#option").value = result.option || "blue";
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    var getting = chrome.storage.sync.get("option");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);