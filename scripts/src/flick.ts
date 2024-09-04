const FPS: number = 60;
const friction: number = 0.985;

const island1: HTMLElement = document.getElementById("island1");
const island2: HTMLElement = document.getElementById("island2");
const island3: HTMLElement = document.getElementById("island3");
const island4: HTMLElement = document.getElementById("island4");
const islandNavel: HTMLElement = document.getElementById("island-navel");

function isCollide(obj1: HTMLElement, obj2: HTMLElement): boolean
{
    if(obj1.offsetLeft + obj1.offsetWidth > obj2.offsetLeft && 
        obj1.offsetLeft < obj2.offsetLeft + obj2.offsetWidth &&
        obj1.offsetTop + obj1.offsetHeight > obj2.offsetTop &&
        obj1.offsetTop < obj2.offsetTop + obj2.offsetHeight)
        {
            return true;
        }
        else return false;
}