function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        options: {
            block_frontpage: document.querySelector("#block_frontpage").checked,
            block_r_all: document.querySelector("#block_r_all").checked,
            block_r_popular: document.querySelector("#block_r_popular").checked,
            block_more_from_this_community: document.querySelector("#block_more_from_this_community").checked,
        }
    });
}

function loadOptions() {
    function setCurrentChoices(result) {
        const options = result.options || {};
        document.querySelector("#block_frontpage").checked = options.block_frontpage || false;
        document.querySelector("#block_r_all").checked = options.block_r_all || false;
        document.querySelector("#block_r_popular").checked = options.block_r_popular || false;
        document.querySelector("#block_more_from_this_community").checked = options.block_more_from_this_community || false;
    }

    chrome.storage.sync.get(["options"], setCurrentChoices);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);