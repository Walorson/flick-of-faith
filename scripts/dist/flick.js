const FPS = 60;
const friction = 0.985;
const island1 = document.getElementById("island1");
const island2 = document.getElementById("island2");
const island3 = document.getElementById("island3");
const island4 = document.getElementById("island4");
const islandNavel = document.getElementById("island-navel");
function isCollide(obj1, obj2) {
    if (obj1.offsetLeft + obj1.offsetWidth > obj2.offsetLeft &&
        obj1.offsetLeft < obj2.offsetLeft + obj2.offsetWidth &&
        obj1.offsetTop + obj1.offsetHeight > obj2.offsetTop &&
        obj1.offsetTop < obj2.offsetTop + obj2.offsetHeight) {
        return true;
    }
    else
        return false;
}
//# sourceMappingURL=flick.js.map