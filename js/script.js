
const clientsArr = [];

class ClientGym {
    static type = 'Clients of GYM';
    constructor (Name, Surname, Strength, Dexterity, Stamina) {
        this.Name = Name;
        this.Surname = Surname;
        this.Strength = Strength;
        this.Dexterity = Dexterity;
        this.Stamina = Stamina;
    }
}

const clientOne = new ClientGym ('Filip', 'Pain', 1,1,3);
const clientTwo = new ClientGym ('Markiz', 'Forester', 1,3,5);
const clientThree = new ClientGym ('Lex', 'Luger', 5,4,4);
clientsArr.push(clientOne,clientTwo,clientThree);

const personalList = document.querySelector('.personal-list')
clientsArr.map((client) => {
    personalList.insertAdjacentHTML(
    'afterbegin',
    `<div class="clients client-1">
        <div class="client-items">
            <div class="drag client-items__logo">
                <span>${client.Name.substr(0, 1)}${client.Surname.substr(0, 1)}</span>
            </div>
            <span class="drag client-items__name">${client.Name} ${client.Surname}</span>
            <div  class="client-items__char">
                <button class="butt-char"></button>
            </div>
        </div>
        <div class="person-char">
            <p class="strength">${'Strength:'} ${client.Strength}</p>
            <p class="dexterity">${'Dexterity:'} ${client.Sexterity}</p>
            <p class="stamina">${'Stamina:'} ${client.Stamina}</p>  
        </div>
    </div>`
    );
})

const personalAmount = document.querySelectorAll('.clients').length;
const personalCounter = document.querySelector('.personal-counter');
personalCounter.innerHTML = ' ' + personalAmount;

const area = document.querySelector('.wrapper');
const buttonExpand = document.querySelectorAll('.butt-char')

document.querySelectorAll('.drag').forEach(client => {
    client.addEventListener("mousedown", function (event) {
        const parent = client.closest('.clients');
        let coordsItemX = event.clientX - parent.getBoundingClientRect().left;
        let coordsItemY = event.clientY - parent.getBoundingClientRect().top;
    
        let gragItemSizes = {
            width: parent.offsetWidth,
            height: parent.offsetHeight
        }
        let gragFieldSizes = {
            left: area.getBoundingClientRect().left + scrollX,
            top: area.getBoundingClientRect().top + scrollY,
            right: area.getBoundingClientRect().left + scrollX + area.offsetWidth,
            bottom: area.getBoundingClientRect().top + scrollY + area.offsetHeight
        }
    
        parent.style.position = 'absolute';
        parent.style.zIndex = 1000;
        document.body.append(parent);
    
        moveItem(event.pageX, event.pageY);
    
        function moveItem(pageX, pageY) {
            let currentX = pageX - coordsItemX;
            let currentY = pageY - coordsItemY;
    
            if (
                currentX + gragItemSizes.width <= gragFieldSizes.right &&
                currentX >= gragFieldSizes.left
            ) {
                parent.style.left = `${currentX}px`;
            } else {
                if (currentX + gragItemSizes.width > gragFieldSizes.right) {
                    parent.style.left = `${gragFieldSizes.right - gragItemSizes.width}px`;
                }
                if (currentX < gragFieldSizes.left) {
                    parent.style.left = `${gragFieldSizes.left}px`;
                }
            }
            if (
                currentY + gragItemSizes.height <= gragFieldSizes.bottom &&
                currentY >= gragFieldSizes.top
            ) {
                parent.style.top = `${currentY}px`;
            } else {
                if (currentY + gragItemSizes.height > gragFieldSizes.bottom) {
                    parent.style.top = `${gragFieldSizes.bottom - gragItemSizes.height}px`;
                }
                if (currentY < gragFieldSizes.top) {
                    parent.style.top = `${gragFieldSizes.top}px`;
                }
            }
        }
    
        let currentDroppable = null;
    
        function onDragItem(event) {
            moveItem(event.pageX, event.pageY);
    
            parent.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            parent.hidden = false;
            if (!elemBelow) return;
            let droppableBelow = elemBelow.closest('.train');
    
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    currentDroppable.classList.remove('active');
                    parent.classList.remove('active');
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    currentDroppable.classList.add('active');
                    parent.classList.add('active');
                }
            }
        }
        document.addEventListener('mousemove', onDragItem);
    
        document.addEventListener("mouseup", function (event) {
            document.removeEventListener('mousemove', onDragItem);
        }, { "once": true });
    });
    parent.addEventListener("dragstart", function (event) {
        event.preventDefault();
    }); 
})

document.querySelectorAll('.butt-char').forEach(but => {
    but.addEventListener('click', function() {
        but.closest('.clients').classList.toggle('expand');
    })
})

const training = document.querySelectorAll('.train');
training.forEach(workout =>{
    console.log(workout);
}) 
