const prophets: Prophet[] = [];
let s = 0;
class Prophet {
    id: number;
    handler: HTMLElement;
    rope: HTMLElement;
    slingshotMode: boolean;
    x: number;
    y: number;
    velocity: number = 0;
    velX: number = 0;
    velY: number = 0;
    angle: number = 0;
    power: number = 0;
    radius: number;
    animation: any;

    constructor(x: number = 0, y: number = 0) {
        prophets.push(this);
        this.id = prophets.length;
        this.x = x;
        this.y = y;
        this.slingshotMode = false;

        document.body.insertAdjacentHTML('beforeend',`<div class="prophet" id="prophet${this.id}"><div class="rope"></div></div>`);
        this.handler = document.getElementById("prophet"+this.id);
        this.rope = this.handler.querySelector(".rope");
        this.radius = this.handler.offsetWidth / 2;

        this.updatePosition();

        this.handler.onmousedown = () => 
        {
            this.slingshotMode = true;
            document.body.style.cursor = 'grabbing';
        }

        window.addEventListener("mousemove", (e: MouseEvent) =>   
        {
            if(this.slingshotMode == true)
            {
                const rect: DOMRect = this.handler.getBoundingClientRect();
                const divCenterX: number = rect.left + rect.width / 2;
                const divCenterY: number = rect.top + rect.height / 2;

                const deltaX: number = e.clientX - divCenterX;
                const deltaY: number = e.clientY - divCenterY;

                this.angle = Math.atan2(deltaY, deltaX);
                const length = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
                this.power = Math.floor(Math.max(length - this.radius, 0)) / 10;

                this.rope.style.width = length+"px";
                this.rope.style.transform = `rotateZ(${this.angle}rad)`;
                this.rope.style.display = 'block';
            }
        });

        window.addEventListener("mouseup", () =>
        {
            if(this.slingshotMode == true)
            {
                this.slingshotMode = false;
                this.flick();
                this.rope.style.display = 'none';
                document.body.style.cursor = '';
            }
        });
    }

    flick()
    {
        this.velocity = -this.power;
        this.velY = this.velocity * Math.sin(this.angle);
        this.velX = this.velocity * Math.cos(this.angle);

        this.animation = setInterval(() => {
            this.move();
        }, 1000 / FPS);
    }

    move()
    {
        this.x += this.velX;
        this.y += this.velY;

        if(this.y > window.innerHeight - 50 || this.y < 0) this.velY = -this.velY;
        if(this.x > window.innerWidth - 50 || this.x < 0) this.velX = -this.velX;

        if(Math.abs(this.velX) < 0.1 && Math.abs(this.velY) < 0.1)
        {
            this.velX = 0;
            this.velY = 0;

            clearInterval(this.animation);
        }
        else
        {
            this.velX *= friction;
            this.velY *= friction;
        }

        if(isCollide(this.handler, prophets[1].handler) && s == 0)
        {
            prophets[1].angle = this.angle;
            prophets[1].power = this.power - 1;
            prophets[1].flick();
            s++;
        }

        this.updatePosition();
    }

    updatePosition()
    {
        this.handler.style.left = this.x+"px";
        this.handler.style.top = this.y+"px";
    }
}

new Prophet(100, 100);
new Prophet(300, 300);