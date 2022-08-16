const allClients = [
    {Name:'Filip', Surname: 'Pain', Strength: 1, Dexterity: 1, Stamina:3},
    {Name:'Markiz', Surname: 'Forester', Strength: 1, Dexterity: 7, Stamina:5},
    {Name:'Lex', Surname: 'Luger', Strength: 5, Dexterity: 4, Stamina:5},
    {Name:'Din', Surname: 'Monley', Strength: 2, Dexterity: 1, Stamina:1},
    {Name:'Koki', Surname: 'Doki', Strength: 6, Dexterity: 4, Stamina:7},
]

class ClientGym {
    static type = 'Clients of GYM';
    constructor (Name, Surname, Strength, Dexterity, Stamina) {
        this.Name = Name;
        this.Surname = Surname;
        this.Strength = Strength;
        this.Dexterity = Dexterity;
        this.Stamina = Stamina;
    } 
    get upgradeStrength() {
        return this.Strength + 1;
    }
    get upgradeDexterity() {
        return this.Dexterity + 1;
    }
    get upgradeStamina() {
        return this.Stamina + 1;
    }
}

const clientsArr = [];

const personalList = document.querySelector('.personal-list')
allClients.map((client) => {

    client = new ClientGym(client.Name, client.Surname, client.Strength, client.Dexterity, client.Stamina);
    clientsArr.push(client);
})
function refreshClient() {
clientsArr.map((client) => {
    personalList.insertAdjacentHTML(
        'afterend',
        `<div id="${client.Name.toLowerCase()}${client.Surname.toLowerCase()}" class="clients">
            <div class="client-items">
                <div class="drag client-items__logo">
                    <span>${client.Name.substring(0, 1)}${client.Surname.substring(0, 1)}</span>
                </div>
                <span class="drag client-items__name">${client.Name} ${client.Surname}</span>
                <div  class="client-items__char">
                    <button class="butt-char"></button>
                </div>
            </div>
            <div class="person-char">
                <p class="strength">${'Strength:'} ${client.Strength}</p>
                <p class="dexterity">${'Dexterity:'} ${client.Dexterity}</p>
                <p class="stamina">${'Stamina:'} ${client.Stamina}</p>  
            </div>
            <div class="upgrade-char">
                <p class="up-strength">${'Upgrade Strength:'} ${client.Strength} ${'/ 15 per 1 minute'}</p>
                <p class="up-dexterity">${'Upgrade Dexterity:'} ${client.Dexterity} ${'/ 15 per 1 minute'}</p>
                <p class="up-stamina">${'Upgrade Stamina:'} ${client.Stamina} ${'/ 15 per 1 minute'}</p>
            </div>
        </div>`
        );
})
}
refreshClient()

const personalCounter = document.querySelector('.personal-counter');
personalCounter.innerHTML = ' ' + allClients.length;

const area = document.querySelector('.wrapper');
const buttonExpand = document.querySelectorAll('.butt-char')


let addStrength;
let addDexterity;
let addStamina;


function upgradeStrength(obj,strengthChar,strengthUp) {
    addStrength = setInterval(function() {
    obj.Strength++;
    // strengthChar.innerHTML = `${'Strength:'} ${obj.Strength}`;
    strengthUp.innerHTML = `${'Upgrade Strength:'} ${obj.Strength} ${'/ 15 per 1 minute'}`;
    }, 4000);
}

function upgradeDexterity(obj,dexterityChar,dexterityUp) {
    addDexterity = setInterval(function() {
    obj.Dexterity++;
    // dexterityChar.innerHTML = `${'Dexterity:'} ${obj.Dexterity}`;
    dexterityUp.innerHTML = `${'Upgrade Dexterity:'} ${obj.Dexterity} ${'/ 15 per 1 minute'}`;
    }, 4000);
}

function upgradeStamina(obj,staminaChar,staminaUp) {
    addStamina = setInterval(function() {
    obj.Stamina++;
    // staminaChar.innerHTML = `${'Stamina:'} ${obj.Stamina}`;
    staminaUp.innerHTML = `${'Upgrade Stamina:'} ${obj.Stamina} ${'/ 15 per 1 minute'}`;
    }, 4000);
}

function stopUpgradeStrength() {
    clearInterval(addStrength);
};

function stopUpgradeDexterity() {
    clearInterval(addDexterity);
};

function stopUpgradeStamina() {
    clearInterval(addStamina);
};

// obj.addEventListener('mousedown', (this)=> {
//     this.stopUpgradeStrength();
//     this.stopUpgradeDexterity();
//     this.stopUpgradeStamina();
// })




document.querySelectorAll('.drag').forEach(client => {
    client.addEventListener("mousedown", function (raisedEvent) {
        const parent = client.closest('.clients');
        let coordsItemX = raisedEvent.clientX - parent.getBoundingClientRect().left;
        let coordsItemY = raisedEvent.clientY - parent.getBoundingClientRect().top;
    
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
    
        moveItem(raisedEvent.pageX, raisedEvent.pageY);
    
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
    
        

        function onDragItem(event) {
            moveItem(event.pageX, event.pageY);
            
            parent.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            parent.hidden = false;
            if (!elemBelow) return;

            
        }
        document.addEventListener('mousemove', onDragItem);
    
        document.addEventListener("mouseup", function (dropElement) {
            
            parent.hidden = true;
            let elemBelow = document.elementFromPoint(dropElement.clientX, dropElement.clientY);
            parent.hidden = false;
            if (!elemBelow) return;
            
            let trainingStrength = elemBelow.closest('.trainig-1');
            let trainingDexterity = elemBelow.closest('.trainig-2');
            let trainingStamina = elemBelow.closest('.trainig-3');

            let obj = clientsArr.find((item) => {
                return item.Name.toLowerCase() + item.Surname.toLowerCase() == parent.id;
            });
            
            let strengthChar = parent.querySelector('.strength');
            let dexterityChar = parent.querySelector('.dexterity');
            let staminaChar = parent.querySelector('.stamina');

            let strengthUp = parent.querySelector('.up-strength');
            let dexterityUp = parent.querySelector('.up-dexterity');
            let staminaUp = parent.querySelector('.up-stamina');

            if (trainingStrength) {
                parent.classList.add('strength');
                upgradeStrength(obj,strengthChar,strengthUp);
                console.log('i znov')
            } else {
                stopUpgradeStrength();
                console.log('vot vono')
                parent.classList.remove('strength');
                parent.classList.remove('expand');
            }

            if (trainingDexterity) {
                parent.classList.add('dexterity');
                upgradeDexterity(obj,dexterityChar,dexterityUp);
            } else {
                stopUpgradeDexterity();
                parent.classList.remove('dexterity');
                parent.classList.remove('expand');
            }

            if (trainingStamina) {
                parent.classList.add('stamina');
                upgradeStamina(obj,staminaChar,staminaUp);
            } else {
                stopUpgradeStamina();
                parent.classList.remove('stamina');
                parent.classList.remove('expand');
            }
            document.removeEventListener('mousemove', onDragItem);

        }, { "once": true });
    });
    parent.addEventListener("dragstart", function (start) {
        start.preventDefault();
    }); 
})


document.querySelectorAll('.butt-char').forEach(but => {
    but.addEventListener('click', function() {
        but.closest('.clients').classList.toggle('expand');
    })
})




// const persons = document.querySelectorAll('.clients')
// const trainings = document.querySelectorAll('.train');
//     trainings.forEach(train => {
//         console.log(train)
//     })




// const training = document.querySelectorAll('.train');
// training.forEach(workout =>{
//     workout.addEventListener()
// }) 



// class trainingApparat {
//     constructor (Strength, Dexterity, Stamina) {
//         this.Strength = Strength;
//         this.Dexterity = Dexterity;
//         this.Stamina = Stamina;
//     }
// }
// const trainStrength = new trainingApparat ();
// const trainDexterity = new trainingApparat ();
// const trainStamina = new trainingApparat ();



// const clientOne = new ClientGym ('Filip', 'Pain', 1, 1, 3);
// const clientTwo = new ClientGym ('Markiz', 'Forester', 1, 3, 5);
// const clientThree = new ClientGym ('Lex', 'Luger', 5, 4, 4);
// clientsArr.push(clientOne,clientTwo,clientThree);