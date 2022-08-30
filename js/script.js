
const allClients = [
    {Id: 1, Name:'Filip', Surname: 'Pain', Strength: 1, Dexterity: 1, Stamina:3},
    {Id: 2, Name:'Markiz', Surname: 'Forester', Strength: 1, Dexterity: 7, Stamina:5},
    {Id: 3, Name:'Lex', Surname: 'Luger', Strength: 5, Dexterity: 4, Stamina:5},
    {Id: 4, Name:'Din', Surname: 'Monley', Strength: 2, Dexterity: 1, Stamina:1},
    {Id: 5, Name:'Koki', Surname: 'Doki', Strength: 6, Dexterity: 4, Stamina:7},
]

const allRooms = [
    {Id: 1, Exercise:'Dumbbells', Skil: 'Strength'},
    {Id: 2, Exercise:'Boxing', Skil: 'Dexterity'},
    {Id: 3, Exercise:'Run', Skil: 'Stamina'},
]

class RoomOfGym {
    constructor (Id, Exercise, Skil, Interval) {
        this.Exercise = Exercise;
        this.Skil = Skil;
        this.Persons = [];
        this.Interval = null; 
        this.Id = Id;
    }   
}

class ClientOfGym {
    constructor (Id, Name, Surname, Strength, Dexterity, Stamina) {
        this.Name = Name;
        this.Surname = Surname;
        this.Strength = Strength;
        this.Dexterity = Dexterity;
        this.Stamina = Stamina;
        this.Id = Id;
    }
}

const clientArr = [];

const personalList = document.querySelector('.personal-list')

allClients.map((client) => {
    client = new ClientOfGym(client.Id, client.Name, client.Surname, client.Strength, client.Dexterity, client.Stamina);
    clientArr.push(client);
})

function conclusionClient() {
    clientArr.map((client) => {
        personalList.insertAdjacentHTML(
            'beforeend',
            `<div id="${client.Name.toLowerCase()}${client.Surname.toLowerCase()}" class="client"  draggable="true">
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
conclusionClient();

const roomArr = [];

const gymComplex = document.querySelector('.right-container')

allRooms.map((room) => {
    room = new RoomOfGym(room.Id, room.Exercise, room.Skil);
    roomArr.push(room);
})

function conclusionRoom() {
    roomArr.map((room) => {
        gymComplex.insertAdjacentHTML(
            'beforeend',
            `<div class="train-room" name="${room.Skil}" id="${room.Skil.toLowerCase()}">
                <div class="train-header">
                    <p class="train-header__name">${room.Skil}</p>
                    <p class="train-header__counter"></p>
                </div>
                <div class="guest-container">
                    <div class="client-position-left">
                        <div class="client-position-left__add"></div>
                    </div>
                    <div class="client-position-right">
                        <div class="client-position-left__add"></div>
                    </div>
                </div>
            </div>`
        );
    });
}
conclusionRoom();

const clients = document.querySelectorAll('.client');
const rooms = document.querySelectorAll('.train-room');
const personalCounter = document.querySelector('.personal-counter');
const homeList = document.querySelector('.personal-list');

function getCounterHome() {
    personalCounter.innerHTML = ' ' + homeList.childNodes.length;
}
getCounterHome() 

const guestCounter = document.querySelectorAll('.train-header__counter');

function getCounterGym() {
    guestCounter.forEach(counter => {
        const parent = counter.closest('.train-room');
        counter.innerHTML = parent.childNodes.length - 5 + `/2`;
    })
}
getCounterGym()

const buttonExpand = document.querySelectorAll('.butt-char');

document.querySelectorAll('.butt-char').forEach(but => {
    but.addEventListener('click', function() {
        but.closest('.client').classList.toggle('expand');
    })
})

const dragOver = function (event) {
    event.preventDefault();
}

const dragEnter = function () {
    if (this.childNodes[5]) {
        this.childNodes[5].classList.add('lock');
    }
}

ondragstart = ()=> {
    clients.forEach((client) => {
        client.childNodes[1].classList.add('lock');
        client.childNodes[3].classList.add('lock');
        client.childNodes[5].classList.add('lock');
    }) 
}

ondrop = ()=> {
    clients.forEach((client) => {
        client.classList.remove('lock');
        client.childNodes[1].classList.remove('lock');
        client.childNodes[3].classList.remove('lock');
        client.childNodes[5].classList.remove('lock');
    }) 
}

rooms.forEach((room) => {
    room.addEventListener('dragover', dragOver);
    room.addEventListener('dragenter', dragEnter);
    room.addEventListener('dragenter', ()=> {
        if (room.childNodes.length == 5) {
            room.querySelector('.client-position-left').classList.add('visible');
        }
        if (room.childNodes.length == 6) {
            if (draggedItem !== room.childNodes[5]) {
                room.querySelector('.client-position-right').classList.add('visible');
            }
        }
    })
    room.addEventListener('dragleave', ()=> {
        room.querySelector('.client-position-left').classList.remove('visible');
        room.querySelector('.client-position-right').classList.remove('visible');
    })
})

const HomeContainer = document.querySelector('.box-items');
HomeContainer.addEventListener('dragover', dragOver);
HomeContainer.addEventListener('drop', homeMixing);
// HomeContainer.addEventListener('dragenter', homeHover);

// function upgrade(clientOfArray,skilName,timerofUpgrade) {
//     addStrength = setInterval(function() {

//         clientOfArray[skilName]++;
//         console.log(clientOfArray)
//         strengthChar.innerHTML = `${'Strength:'} ${client.Strength}`;
//         strengthUp.innerHTML = `${'Upgrade Strength:'} ${client.Strength} ${'/ 15 per 1 minute'}`;
//     }, timerofUpgrade);
// }

function findObjToRoom(guest, roomArray) {
    clientArr.map((clientOfArray)=> {
        if (guest.id === (clientOfArray.Name + clientOfArray.Surname).toLowerCase()) {
            if (roomArray.length <= 2) {
                roomArray.push(clientOfArray);
                clientIndex = clientArr.indexOf(clientOfArray);
                clientArr.splice(clientIndex, 1);
            }
        }
    })
    roomArr.map((room)=> {
        const ArrayOfRoom = room.Persons;
        if (ArrayOfRoom.length >= 1) {
            ArrayOfRoom.map((ObjOfRoom) => {
                if (guest.id === (ObjOfRoom.Name + ObjOfRoom.Surname).toLowerCase()) {
                    roomArray.push(ObjOfRoom);
                    clientIndex = ArrayOfRoom.indexOf(ObjOfRoom);
                    ArrayOfRoom.splice(clientIndex, 1);
                }
            })
        }
    })
}

const HomeAll = document.querySelector('.box-items');

HomeAll.addEventListener('drop',()=> {
    roomArr.map((room)=> {
        const ArrayOfRoom = room.Persons;
        if (ArrayOfRoom.length >= 1) {
            ArrayOfRoom.map((ObjOfRoom) => {
                if (draggedItem.id === (ObjOfRoom.Name + ObjOfRoom.Surname).toLowerCase()) {
                    clientArr.push(ObjOfRoom);
                    clientIndex = ArrayOfRoom.indexOf(ObjOfRoom);
                    ArrayOfRoom.splice(clientIndex, 1);
                }
            })
        }
    })
})

function checkTheRoom(client) {
    rooms.forEach((room) => {
        const roomPosLeft = room.getBoundingClientRect().left;
        const roomPosTop = room.getBoundingClientRect().top;
        const roomWidth = room.clientWidth;
        const roomHeight = room.clientHeight;
  
        if (client.clientX > roomPosLeft &&
            client.clientX < roomPosLeft + roomWidth &&
            client.clientY > roomPosTop &&
            client.clientY < roomHeight + roomPosTop)
        {
            if (room.childNodes.length <= 6) {
                const guest = client.target;
                room.append(guest);
                guest.className = 'client';
                guest.classList.add(room.id);
                getCounterGym();
                getCounterHome();
                // upgrade(clientOfArray,skilName,timerofUpgrade=3000)
                // const skilName = room.childNodes[1].childNodes[1].textContent;  
                roomArr.map((roomEnter)=> {

                    if (room.id === (roomEnter.Skil).toLowerCase()) {
                        const roomArray = roomEnter.Persons
                        findObjToRoom(guest, roomArray);
                    }
                })
            }
        }
    })
}

const dragItemStart = function() {
    draggedItem = this;
}

const dragItemEnd = function() {
    draggedItem = null;
}


draggedItem = null;
droppedItem = null;

clients.forEach((dragItem)=> {
    dragItem.addEventListener('dragstart', dragItemStart);
    dragItem.addEventListener('dragend', dragItemEnd);
})


clients.forEach((person) => {
    person.addEventListener('dragend', function (client) {
      checkTheRoom(client);
    })
    person.addEventListener('dragenter', ()=> {
        if (draggedItem !== droppedItem) {
            droppedItem = person.closest('.client');
        }
    })
    person.addEventListener('dragleave', ()=> {
        droppedItem = null;
    })
})

function homeMixing(event) {
    if (droppedItem) {
        if (droppedItem.parentElement === draggedItem.parentElement) {
            const children = Array.from(droppedItem.parentElement.children);
            const draggedIndex = children.indexOf(draggedItem);
            const droppedIndex = children.indexOf(droppedItem);

            if (draggedIndex > droppedIndex) {
                draggedItem.parentElement.insertBefore(draggedItem, droppedItem);
            } else {
                draggedItem.parentElement.insertBefore(
                    draggedItem,
                    droppedItem.nextElementSibling
                );
            }
        } else {
            droppedItem.before(draggedItem);
            draggedItem.className = 'client';
            getCounterGym();
            getCounterHome();
        }
    }
}

const homeboxBefore = document.querySelector('.else-list')

homeboxBefore.addEventListener('drop', ()=> {
    homeList.append(draggedItem);
    draggedItem.className = 'client';
})

// const innerHover =  `<div class="client-position-right">
//                         <div class="client-position-home"></div>
//                     </div>`;



// const dragHover = document.querySelector('.client-position-home')


// clients.forEach((client)=> {
//     client.addEventListener('dragenter', ()=> {
//         if (draggedItem !== droppedItem) {
//             const droppedItemPosLeft = droppedItem.getBoundingClientRect().left;
//             const droppedItemPosTop = droppedItem.getBoundingClientRect().top;
//             const droppedItemPosbottom  = droppedItem.getBoundingClientRect().bottom;
//             const droppedItemWidth = droppedItem.clientWidth;
//             const droppedItemHeight = droppedItem.clientHeight;
//             let centrX = droppedItemHeight / 2;
            
//             ondrag = (event)=> {
//                 const xCursorPosition = event.clientX;
//                 const yCursorPosition = event.clientY;
//                 let dragHover = document.querySelector('.client-position-home');

//                 if (xCursorPosition > droppedItemPosLeft &&
//                     xCursorPosition < droppedItemPosLeft + droppedItemWidth &&
//                     yCursorPosition > (droppedItemPosTop-50) &&
//                     yCursorPosition < droppedItemPosTop + centrX
//                 )
//                     console.log('1/2')
//                     if (!dragHover) {
//                             droppedItem.insertAdjacentHTML(
//                             'beforebegin',
//                             `<div class="client-position-home">
//                                 <div class="client-position-home__add"></div>
//                             </div>`
//                             );
//                         }
//                         // console.log(homeList.hasChildNodes(dragHover))

//                 if (xCursorPosition > droppedItemPosLeft &&
//                     xCursorPosition < droppedItemPosLeft + droppedItemWidth &&
//                     yCursorPosition > droppedItemPosTop + centrX &&
//                     yCursorPosition < (droppedItemPosbottom+50)
//                 ) 
//                     {
//                         console.log('2/2')
//                     }
                
//             }

//             ondragleave = (event)=> {
//                 const xCursorPosition = event.clientX;
//                 const yCursorPosition = event.clientY;
//                 let dragHover = document.querySelector('.client-position-home');

//                 if (xCursorPosition > droppedItemPosLeft &&
//                     xCursorPosition < droppedItemPosLeft + droppedItemWidth &&
//                     yCursorPosition > droppedItemPosTop &&
//                     yCursorPosition < droppedItemPosTop + centrX
//                 )
//                     if (dragHover) {
//                         console.log('dragleave')
//                         homeList.removeChild(dragHover);
//                     }
                

//                 if (xCursorPosition > droppedItemPosLeft &&
//                     xCursorPosition < droppedItemPosLeft + droppedItemWidth &&
//                     yCursorPosition > droppedItemPosTop + centrX &&
//                     yCursorPosition < centrX + droppedItemPosbottom
//                 ) 
//                     { 
//                         // console.log('2/2') 
//                     }
                
//             }    
//         }
//     })
// })

