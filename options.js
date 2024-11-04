
const restoreOptions = () => {
    const close_modal = document.getElementById('close_modal');
    const close_toast = document.getElementById('close_toast');
    const force_director = document.getElementById('force_director');
    const force_fullscreen = document.getElementById('force_fullscreen');

    chrome.storage.sync.get({'auto_close_toast': true, 'auto_close_modal': true, 'force_director': true, 'force_fullscreen': false}, function(items) {
        console.log('Settings retrieved', items);
        close_modal.checked = items['auto_close_modal'];
        close_toast.checked = items['auto_close_toast'];
        force_director.checked = items['force_director'];
        force_fullscreen.checked = items['force_fullscreen'];
    });
}

const saveOptions = () => {
    const close_modal = document.getElementById('close_modal').checked;
    const close_toast = document.getElementById('close_toast').checked;
    const force_director = document.getElementById('force_director').checked;
    const force_fullscreen = document.getElementById('force_fullscreen').checked;

    chrome.storage.sync.set(
        {
            'auto_close_toast': close_toast,
            'auto_close_modal': close_modal,
            'force_director': force_director,
            'force_fullscreen': force_fullscreen
        },
        () => {
            console.log('Settings saved');
        }
      );
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('close_modal').addEventListener('click', saveOptions);
document.getElementById('close_toast').addEventListener('click', saveOptions);
document.getElementById('force_director').addEventListener('click', saveOptions);
document.getElementById('force_fullscreen').addEventListener('click', saveOptions);

  
