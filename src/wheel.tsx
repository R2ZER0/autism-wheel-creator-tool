import {h} from 'preact'

const DEGREE_IN_RADIANS = Math.PI / 180.0;

export type WheelTraitData = {
    label: string;
    colour: string;
    value: number;
};

export type WheelData = {
    traits: WheelTraitData[];
}


function polarToCartesian(centerX: number, centerY: number, radius: number, angleInRadians: number) {
    return {
        x: centerX + (radius * Math.cos(angleInRadians )),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

// Based on functions from:
// https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function arcWedgePath(x: number, y: number, radius: number, startAngleRad: number, arcLengthRad: number) {
    const endAngleRad = startAngleRad + arcLengthRad;
    const start = polarToCartesian(x, y, radius, endAngleRad);
    const end = polarToCartesian(x, y, radius, startAngleRad);

    const startAngleInDegrees = DEGREE_IN_RADIANS * startAngleRad;
    const endAngleInDegrees = DEGREE_IN_RADIANS * endAngleRad;
    const largeArcFlag = endAngleInDegrees - startAngleInDegrees <= 180 ? "0" : "1";

    return [
        "M", 0, 0,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
    ].join(" ");
}

export type WheelChartProps = {
    wheelData: WheelData;
}
export const WheelChart = (props: WheelChartProps) => {
    const {wheelData} = props;
    const numArcs = wheelData.traits.length
    const arcSize = (Math.PI * 2) / numArcs

    return <svg id={"wheel-chart"} viewBox={"-200 -150 400 300"} xmlns={"http://www.w3.org/2000/svg"}>
        {/*} Coloured Arcs */}
        {wheelData.traits.map((trait, i) => <path
            d={arcWedgePath(0, 0, 100 * (trait.value / 4.0), i * arcSize, arcSize)} fill={trait.colour}></path>)}
        {/* Guide Lines - Spokes */}
        {wheelData.traits.map((_trait, i) => <path
            d={`M 0 0 L ${(xy => [xy.x, xy.y].join(" "))(polarToCartesian(0, 0, 100, i * arcSize))}`}
            stroke={"black"}
        />)}
        {/* Guide Lines - Arcs */}
        {[1, 2, 3].map(i => <circle cx={0} cy={0} r={100 * (i / 4.0)} fill={"none"} stroke={"grey"}></circle>)}
        {/* Text Labels */}
        {wheelData.traits.map((trait, i) => (((cxy) => <text x={cxy.x} y={cxy.y}
                                                                   text-anchor={cxy.x < 0 ? "end" : "start"}>{trait.label}</text>)(polarToCartesian(0, 0, 100, i * arcSize + (arcSize / 2)))))}
    </svg>
};