export async function getComponent(component) {
    const componentUrl = `/components/${component}.html`;

    const res = await fetch(componentUrl);
    return res.text();
}

export function loadComponents() {
    const elements = document.querySelectorAll(".md-component");

    elements.forEach((e) => {
        getComponent(e.getAttribute("value")).then((html) => {
            e.innerHTML = html;
        });
    });
}
