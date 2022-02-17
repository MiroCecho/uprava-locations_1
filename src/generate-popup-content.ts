
import { ILocation } from './interfaces';

export const generatePopupContent = (data: ILocation[]): HTMLUListElement => {

    const ul = document.createElement('ul');
    data.forEach((loc, index) => {
        const isLast = data.length - 1 === index;
        const li = document.createElement('li');
        li.innerHTML = `
            <button
                ${!loc.children ? 'disabled': ''}
                onclick="this.parentElement.classList.toggle('expanded')"
                class="${isLast ? 'last' : ''}"
            ></button>
            <a href
                onclick="return false"
            >
                ${loc.name}
            </a>
        `;
        ul.appendChild(li);
        if (loc.children && loc.children.length) {
            li.appendChild(generatePopupContent(loc.children));
        }
    });

    return ul;

};