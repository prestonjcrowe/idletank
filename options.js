
const restoreOptions = () => {
    const close_modal = document.getElementById('close_modal');
    const close_toast = document.getElementById('close_toast');
    const force_mute = document.getElementById('force_mute');
    const force_fullscreen = document.getElementById('force_fullscreen');

    chrome.storage.sync.get({'auto_close_toast': true, 'auto_close_modal': true, 'force_mute': true, 'force_fullscreen': true}, function(items) {
        console.log('Settings retrieved', items);
        close_modal.checked = items['auto_close_modal'];
        close_toast.checked = items['auto_close_toast'];
        force_fullscreen.checked = items['force_fullscreen'];
        force_mute.checked = items['force_mute'];
    });
}

const saveOptions = () => {
    const close_modal = document.getElementById('close_modal').checked;
    const close_toast = document.getElementById('close_toast').checked;
    const force_fullscreen = document.getElementById('force_fullscreen').checked;
    const force_mute = document.getElementById('force_mute').checked;


    chrome.storage.sync.set(
        {
            'auto_close_toast': close_toast,
            'auto_close_modal': close_modal,
            'force_fullscreen': force_fullscreen,
            'force_mute': force_mute
        },
        () => {
            console.log('Settings saved');
        }
      );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('close_modal').addEventListener('click', saveOptions);
document.getElementById('close_toast').addEventListener('click', saveOptions);
document.getElementById('force_fullscreen').addEventListener('click', saveOptions);
document.getElementById('force_mute').addEventListener('click', saveOptions);

  
