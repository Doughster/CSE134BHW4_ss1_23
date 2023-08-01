/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('addNewElementBtn');
    element.addEventListener('click', function () {
        addNewElement();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('deleteBySelectorBtn');
    element.addEventListener('click', function () {
        deleteBySelector();
    });

    element = document.getElementById('basicCloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', function () {
        advancedCloneBtn();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    basicTextArea.value += (`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`);
}

function advancedWalk() {
    let textarea = document.getElementById('advancedTextArea');
    
    function addNodeHierarchy(node, depth) {
        let prefix = '    '.repeat(depth); // Indentation
        if (node.nodeType === Node.ELEMENT_NODE) {
            textarea.value += prefix + '|-- ' + node.nodeName + '\n';
            let children = node.childNodes;
            for (let child of children) {
                addNodeHierarchy(child, depth + 1);
            }
        }
    }
    let root = document.documentElement;
    addNodeHierarchy(root, 0);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function getRandomDarkColor() {
    let darkColors = [
        'darkcolor1',
        'darkcolor2',
        'darkcolor3',
        'darkcolor4',
        'darkcolor5',
        'darkcolor6',
    ];
    let randomIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomIndex];
}

function toggleShmancy() {
    let p = document.getElementById('p1');
    p.classList.toggle('shmancy');
}

function advancedModify() {
    let el = document.getElementById('h1');
    el.innerHTML = "DOM Manipulation is Fun!";
    let randomDarkColor = getRandomDarkColor();
    el.style.color = `var(--${randomDarkColor})`;
    toggleShmancy(); 
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function addNewElement() {
    let addNewElement = document.getElementById('addNewElement');
    let newElementContent = document.getElementById('newElementContent');
    let = document.getElementById('output');
    let newNode;

    switch (addNewElement.value) {
        case 'textNode':
            newNode = document.createTextNode(`New Text Node - ${new Date().toLocaleString()}`);
            break;
        case 'comment':
            newNode = document.createComment(`New Comment - ${new Date().toLocaleString()}`);
            break;
        case 'element':
            let name = newElementContent.value || 'New Element';
            newNode = document.createElement(name);
            newNode.textContent = `New Element - ${new Date().toLocaleString()}`;
            break;
        default:
            return;
    }

    let newLine = document.createElement('br');
    output.appendChild(newNode);
    output.appendChild(newLine);
    output.style.border = '1px solid red';
    output.style.padding = '5px';
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    let controls = document.getElementById('controls');
    let currNode = document.body.lastChild;

    while (currNode != controls) {
        let prevNode = currNode.previousSibling;
        document.body.removeChild(currNode);
        currNode = prevNode;
    }

    let h1 = document.getElementById('h1');
    let p1 = document.getElementById('p1');
    p1.remove();
    h1.remove();
}

function deleteBySelector() {
    let selectorInput = document.getElementById('selectorInput');
    let selector = selectorInput.value;

    let elementsToDelete = document.querySelectorAll(selector);
    elementsToDelete.forEach((element) => {
        element.parentNode.removeChild(element);
    });
}

function basicClone() {
    let p1 = document.getElementById('p1');
    let clonedP1 = p1.cloneNode(true);
    document.body.appendChild(clonedP1);
}

function advancedClone() {
    let cardTemplate = document.getElementById('cardTemplate');
    let clonedCard = cardTemplate.content.cloneNode(true);
    let cardTitle = clonedCard.querySelector('.card-title');
    let cardText = clonedCard.querySelector('.card-text');

    let randomNumber = Math.floor(Math.random() * 1000);
    cardTitle.textContent = `Card ${randomNumber}`;
    cardText.textContent = `Text Content - ${randomNumber}.`;

    let cardContainer = document.querySelector('#controls');
    cardContainer.appendChild(clonedCard);
}
window.addEventListener('DOMContentLoaded', init);