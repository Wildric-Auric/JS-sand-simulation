const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
var Inputs = {
    mouse: {
        x: 0,
        y: 0
    },

    keys: {
        d: 0,
        q: 0,
        z: 0,
        s: 0,
        right: 0,
        left: 0,
        up: 0,
        down: 0,
        c: 0,
    }
}
var particleSize = 
{
    x: 10,
    y: 10
}
var sceneObjects = []
canvas.width = 1024
canvas.height = 576
context.fillRect(0,0, canvas.width, canvas.height) //Top left 0,0
class Sprite {
    constructor( {position, rotation, size, color } ) {
        this.position = position;
        this.rotation = rotation;
        this.size = size;
        this.color = color;
    }

    Draw() {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        context.fillStyle = '#000000';
    }
}
class Particle {
    constructor(sprite, stat) {
        this.sprite = sprite;
        this.stat = stat;
    }
}
// sceneObjects.push(new Sprite( 
//     {
//         position:
//         {
//             x: 0,
//             y: 0
//         },
            
//         rotation: 0,
//         size: 
//         {
//             x: 50,
//             y: 100
//         },
//         color: "red"
//     }   
//     )
// )
function IsFree(x,y) {
    for (let i = 0; i < sceneObjects.length; i++) {
        if (sceneObjects[i].sprite.position.x == x && sceneObjects[i].sprite.position.y == y) return false
    }
    return true
}
function AddIfFree(stat) {

    console.log("fuck this");
    for (let i = 0; i < sceneObjects.length; i++) {
        if (sceneObjects[i].sprite.position.x == Inputs.mouse.x - Inputs.mouse.x % particleSize.x && 
            sceneObjects[i].sprite.position.y == Inputs.mouse.y - Inputs.mouse.y % particleSize.y) {return}
    }
    var col = "red"
    if (stat) {col = "white"}
    let sprite = 
        new Sprite ( 
            {
                position:
                {
                    x: Inputs.mouse.x - Inputs.mouse.x % particleSize.x,
                    y: Inputs.mouse.y - Inputs.mouse.y % particleSize.y,
                },
                    
                rotation: 0,
                size: 
                {
                    x: particleSize.x,
                    y: particleSize.y
                },
                color: col
            }   
        )
    sceneObjects.push(new Particle(sprite,stat))
}

function MainLoop() {
    window.requestAnimationFrame(MainLoop)
    context.fillStyle = '#000000'
    context.fillRect(0,0, canvas.width, canvas.height)
    // let player = sceneObjects[0];
    let move = {
        x: (Inputs.keys.d) - (Inputs.keys.q),
        y: (Inputs.keys.s) - (Inputs.keys.z)
    }
    // player.position.x += move.x * 5;
    // player.position.y += move.y * 5;

    if (Inputs.keys.c) {
        AddIfFree(1)
    }
    if (Inputs.keys.v) {
        AddIfFree(0)
    }
    for (let i = 0; i < sceneObjects.length; i++) {
        let cur = sceneObjects[i];
        let x = cur.sprite.position.x;
        let y = cur.sprite.position.y;
        if (!cur.stat) {
            if (IsFree(x, y + particleSize.y)) sceneObjects[i].sprite.position.y += particleSize.y;
            else if (IsFree(x+ particleSize.x, y) && IsFree(x+particleSize.x, y + particleSize.y)) {
                cur.sprite.position.x += particleSize.x;
                cur.sprite.position.y += particleSize.y;
            }
            else if (IsFree(x - particleSize.x, y) && IsFree(x-particleSize.x, y + particleSize.y)) {
                cur.sprite.position.x -= particleSize.x;
                cur.sprite.position.y += particleSize.y;
            }
        }
        cur.sprite.Draw()
    }
}
MainLoop()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            Inputs.keys.d = 1
            break;
        case 'q':
            Inputs.keys.q = 1
            break;
        case 'z':
            Inputs.keys.z = 1
            break;
        case 's':
            Inputs.keys.s = 1
            break;
        case 'c':
            Inputs.keys.c = 1
            break;
        case 'v':
            Inputs.keys.v = 1
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            Inputs.keys.d = 0
            break;
        case 'q':
            Inputs.keys.q = 0
            break;
        case 'z':
            Inputs.keys.z = 0
            break;
        case 's':
            Inputs.keys.s = 0
            break;
        case 'c':
            Inputs.keys.c = 0
            break;
        case 'v':
            Inputs.keys.v = 0
            break;
    }
})

canvas.addEventListener("mousemove", function(e) { 
    temp = canvas.getBoundingClientRect();
    Inputs.mouse.x = e.clientX - temp.left;
    Inputs.mouse.y = e.clientY - temp.top;
})

// canvas.addEventListener('click', event => { 
//     if(event.type == "mousedown")

// })