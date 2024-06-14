const CENTRE = {"x": 256, "y": 256}
const RADIUS = 128;
const MAX_VALUE = 4;
const MIN_VALUE = 0;

export type WheelTraitData = {
    label: string;
    colour: string;
    value: number;
};

export type WheelData = {
    title: string;
    traits: WheelTraitData[];
}

export class WheelChart {
    ctx: CanvasRenderingContext2D;
    options: WheelData;

    numArcs: number;
    arcSize: number;

    constructor(options: WheelData, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.options = options;

        this.numArcs = options.traits.length
        this.arcSize = (Math.PI * 2) / this.numArcs
    }

    renderArc(i: number) {
        let trait = this.options.traits[i]
        let arcValue = Math.max(Math.min(trait.value, MAX_VALUE), MIN_VALUE)
        this.ctx.fillStyle = trait.colour
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath()
        this.ctx.arc(CENTRE.x, CENTRE.y, RADIUS * ((arcValue / (MAX_VALUE - MIN_VALUE)) + MIN_VALUE), i * this.arcSize, (i + 1) * this.arcSize);
        this.ctx.lineTo(CENTRE.x, CENTRE.y);
        this.ctx.closePath()
        this.ctx.fill()
    }

    renderGuides() {
        this.ctx.strokeStyle = "grey";

        // Radial Guides
        for (let i = 0; i <= 4; i++) {
            this.ctx.beginPath();
            this.ctx.arc(CENTRE.x, CENTRE.y, RADIUS * (i / 4), 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.stroke()
        }

        // Spoke Guides
        for (let i = 0; i < this.numArcs; i++) {
            this.ctx.beginPath();
            this.ctx.arc(CENTRE.x, CENTRE.y, RADIUS, i * this.arcSize, i * this.arcSize)
            this.ctx.lineTo(CENTRE.x, CENTRE.y)
            this.ctx.stroke()
        }
    }

    renderChart() {
        for (let i = 0; i < this.numArcs; i++) {
            this.renderArc(i)
        }
        this.renderGuides()
    }
}
