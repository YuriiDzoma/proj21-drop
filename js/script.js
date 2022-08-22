
const allClients = [
    {Name:'Filip', Surname: 'Pain', Strength: 1, Dexterity: 1, Stamina:3},
    {Name:'Markiz', Surname: 'Forester', Strength: 1, Dexterity: 7, Stamina:5},
    {Name:'Lex', Surname: 'Luger', Strength: 5, Dexterity: 4, Stamina:5},
    {Name:'Din', Surname: 'Monley', Strength: 2, Dexterity: 1, Stamina:1},
    {Name:'Koki', Surname: 'Doki', Strength: 6, Dexterity: 4, Stamina:7},
]

const allRooms = [
    {Exercise:'Dumbbells', Skil: 'Strength'},
    {Exercise:'Boxing', Skil: 'Dexterity'},
    {Exercise:'Run', Skil: 'Stamina'},
]

class RoomOfGym {
    constructor (Exercise, Skil) {
        this.Exercise = Exercise;
        this.Skil = Skil;
    } 
}

class ClientOfGym {
    constructor (Name, Surname, Strength, Dexterity, Stamina) {
        this.Name = Name;
        this.Surname = Surname;
        this.Strength = Strength;
        this.Dexterity = Dexterity;
        this.Stamina = Stamina;
    }

    
}

const clientArr = [];

const personalList = document.querySelector('.personal-list')

allClients.map((client) => {
    client = new ClientOfGym(client.Name, client.Surname, client.Strength, client.Dexterity, client.Stamina);
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
    room = new RoomOfGym(room.Exercise, room.Skil);
    roomArr.push(room);
})

function conclusionRoom() {
    roomArr.map((room) => {
        gymComplex.insertAdjacentHTML(
            'beforeend',
            `<div class="train-room" id="${room.Exercise.toLowerCase()}">
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


ondrop = ()=> {
    clients.forEach((client) => {
        client.classList.remove('lock');
    }) 
}

rooms.forEach((room) => {
    room.addEventListener('dragover', dragOver);
    room.addEventListener('dragenter', dragEnter);
})

const HomeContainer = document.querySelector('.box-items');
HomeContainer.addEventListener('dragover', dragOver);

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
                room.append(client.target);
                client.target.className = 'client';
                client.target.classList.add(room.id);
                getCounterGym();
                getCounterHome();
            }
        }
    })
}

const home = document.querySelector('.box-items');

function checkTheHome(client) {       
    const homePosLeft = home.getBoundingClientRect().left;
    const homePosTop = home.getBoundingClientRect().top;
    const homeWidth = home.clientWidth;
    const homeHeight = home.clientHeight;

    if (client.clientX > homePosLeft &&
        client.clientX < homePosLeft + homeWidth &&
        client.clientY > homePosTop &&
        client.clientY < homeHeight + homePosTop)
    {
        homeList.append(client.target);
        client.target.className = 'client';
        getCounterGym();
        getCounterHome();
    }
}

clients.forEach((person) => {
    person.addEventListener('dragend', function (client) {
      checkTheRoom(client);
      checkTheHome(client);
    })
})

rooms.forEach((room) => {
    room.addEventListener('dragenter', ()=> {
        if (room.childNodes.length == 5) {
            room.querySelector('.client-position-left').classList.add('visible');
        }
        if (room.childNodes.length == 6) {
            room.querySelector('.client-position-right').classList.add('visible');
        }
    })
})

// ondragend = ()=> {
//     rooms.forEach((room) => {
//         if (room.childNodes.length == 6) {
//             room.querySelector('.client-position-right').classList.add('visible');
//         } else {room.querySelector('.client-position-right').classList.remove('visible')}
//     })
// }
 


rooms.forEach((room) => {
    room.addEventListener('dragleave', ()=> {
        room.querySelector('.client-position-left').classList.remove('visible');
        room.querySelector('.client-position-right').classList.remove('visible');
    })
})