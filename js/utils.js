const loading = document.querySelector('.loading');

export function getObjectFromForm(formId) {
    const form = document.getElementById(formId);

    let obj = {}

    form.querySelectorAll('input').forEach(input => {
        const key = input.id;
        
        if (input.value) {
            obj[key] = input.value;
        }
    });

    return obj;
}

export function fillForm(formId, cliente) {
    const form = document.getElementById(formId);

    const action = cliente._id ? 'Editando' : 'Adicionando';

    document.querySelector('.modal-title').textContent = action + ' cliente:';

    if (form) {
        for (let key in cliente) {
            const input = form.querySelector(`#${key}`);
    
            if (input) {
                input.value = cliente[key];
            }
        }
    }
}

export function formatDataHora(date) {
    return date.toLocaleDateString() + ' ' + String(date.getHours()).padStart(2, '0') 
        + ':' + String(date.getMinutes()).padStart(2, '0');
}

export function toggleLoading() {
    loading.classList.toggle('show');
}