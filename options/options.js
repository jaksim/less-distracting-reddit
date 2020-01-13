function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        options: {
            block_frontpage: document.querySelector("#block_frontpage").checked,
            block_r_all: document.querySelector("#block_r_all").checked,
            block_r_popular: document.querySelector("#block_r_popular").checked,
            block_more_from_this_community: document.querySelector("#block_more_from_this_community").checked,
            block_topbar_subreddits_list: document.querySelector("#block_topbar_subreddits_list").checked,
            block_read_next_box: document.querySelector("#block_read_next_box").checked,
            block_my_subreddits_dropdown: document.querySelector("#block_my_subreddits_dropdown").checked,
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
        document.querySelector("#block_topbar_subreddits_list").checked = options.block_topbar_subreddits_list || false;
        document.querySelector("#block_read_next_box").checked = options.block_read_next_box || false;
        document.querySelector("#block_my_subreddits_dropdown").checked = options.block_my_subreddits_dropdown || false;
    }

    chrome.storage.sync.get(["options"], setCurrentChoices);
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);