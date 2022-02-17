
import { ILocation } from './interfaces';
export let treeList:ILocation[];
export const generatePopupContent = (data: ILocation[],init:boolean=true): HTMLUListElement => {
    const ul = document.createElement('ul');
    if(init){
        treeList=[];
    }
    data.forEach((loc, index) => {
        const isLast = data.length - 1 === index;
        const li = document.createElement('li');
        treeList.push(loc);
        li.innerHTML = `
            <button
                ${!loc.children ? 'disabled': ''}
                onclick="this.parentElement.classList.toggle('expanded')"
                class="${isLast ? 'last' : ''}"
            ></button>
            <a href
                onclick="return false" id=${loc.id} title=${"loc.name"}
            >
                ${loc.name}
            </a>
        `;
        ul.appendChild(li);
        if (loc.children && loc.children.length) {
            li.appendChild(generatePopupContent(loc.children,false));
        }
    });

    return ul;

};