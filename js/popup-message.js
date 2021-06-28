const types = {
    success: {
        icon: 'check_circle',
        color: '#4c8f6a'
    },
    error: {
        icon: 'error_outline',
        color: '#f88'
    },
    info: {
        icon: 'info',
        color: '#46bbf1'
    }
}

var timeout;

export function showMessage(type, message) {
    const popup = document.querySelector('.popup');
    const icon = popup.querySelector('span');
    const pMessage = popup.querySelector('p');

    const props = types[type];

    icon.textContent = props.icon;
    icon.style.color = props.color;

    pMessage.textContent = message;

    popup.classList.add('show');

    timeout = setTimeout(closePopup, 5000);
}

export function closePopup() {
    document.querySelector('.popup').classList.remove('show');
    clearTimeout(timeout);
}

window.closePopup = closePopup;