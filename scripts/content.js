const INTERVAL = 5000;
let AUTO_CLOSE_TOAST = true;
let AUTO_CLOSE_MODAL = true;
let AUTO_DIRECTOR_MODE = true;
let AUTO_FULLSCREEN_MODE = false;
let AUTO_MUTE_MODE = false;

// Retrieve settings and set default values
chrome.storage.sync.get(
  {
    'auto_close_toast': true,
    'auto_close_modal': true,
    'force_fullscreen': true,
    'force_mute': true
  },
  function (items) {
    console.log('Settings retrieved', items);
    AUTO_CLOSE_TOAST = items['auto_close_toast'];
    AUTO_CLOSE_MODAL = items['auto_close_modal'];
    AUTO_MUTE_MODE = items['force_mute'];
    AUTO_FULLSCREEN_MODE = items['force_fullscreen'];
});

function is_typing_in_chat() {
  const chat_input = document.querySelector("#chat-input")
  return document.activeElement === chat_input;
}
function is_logged_in() {
  const login_form = document.querySelector("div[class^='log-in_info']");
  return login_form === null;
}

function close_modal() {
  const modal = document.querySelector("[id|=modal]");
  if (modal) {
    const close_button = modal.querySelector("button");
    close_button.click();
  }
}

function enable_director_mode() {
  const stream_grid = document.querySelector("div[class^='live-streams_live-streams-grid']");
  if (stream_grid) {
    const director_mode_button = document.querySelector("[id|=director-mode]");
    director_mode_button.click();
  }
}

function close_toast() {
  const toast = document.querySelector("div[class^='toast_toast'], div[class*=' toast_toast']");
  if (toast) {
    const close_button = toast.querySelector("button");
    close_button.click();
  }
}

function force_fullscreen() {
  const video = document.querySelector('video');
  if (!document.fullscreenElement && video) {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
      video.msRequestFullscreen();
    }
  }
}

function toggle_mute() {
  const mute_button = document.querySelector("button[class^='livepeer-video-player_mute']");
  console.log(mute_button)

  if (mute_button) {
    mute_button.click();
  }
}


function run() {
  if (!is_logged_in()) {
    return;
  }

  if (AUTO_CLOSE_TOAST) {
    close_toast();
  }

  if (AUTO_CLOSE_MODAL) {
    close_modal();
  }

  if (AUTO_DIRECTOR_MODE) {
    // enable_director_mode();
  }
}

setInterval(run, INTERVAL);
document.addEventListener("keydown", function(event) {
  if (event.code === "KeyF" && AUTO_FULLSCREEN_MODE && !is_typing_in_chat()) {
    force_fullscreen()
  } else if (event.code === "KeyM" && AUTO_MUTE_MODE && !is_typing_in_chat()) {
    console.log("toggling mute")
    toggle_mute()
  }
});
