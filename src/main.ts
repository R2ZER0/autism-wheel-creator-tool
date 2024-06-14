import "preact/debug"

import './style.css'
import {h, render} from "preact"
import { WheelData,  WheelChart} from './wheel.ts'
import {WheelForm} from "./wheelUi.ts";
import {useEffect, useRef, useState} from "preact/hooks";

let WHEEL_DATA: WheelData = {
    "title": "Hello, Wheel!",
    "traits": [
        {"label": "Test 1", "colour": "red", "value": 0},
        {"label": "Test 2", "colour": "green", "value": 1},
        {"label": "Test 3", "colour": "blue", "value": 2},
        {"label": "Test 4", "colour": "orange", "value": 3},
        {"label": "Test 5", "colour": "yellow", "value": 4}
    ]
}

function App() {
    let [wheelData, setWheelData] = useState<WheelData>(WHEEL_DATA)

    return h("div", {}, [
        h(WheelForm,{wheelData, setWheelData}),
        h(WheelCanvas, {wheelData})
    ])
}

function WheelCanvas(props: {wheelData: WheelData}) {
    let {wheelData} = props;
    let canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current) return;
        console.log("Rendering Chart")
        let ctx = canvas.current!.getContext('2d')
        ctx?.clearRect(0, 0, 512, 512)
        let chart = new WheelChart(wheelData, ctx!)
        chart.renderChart()
    }, [wheelData])

    return h("canvas", {width: 512, height: 512, ref: canvas})
}

render(h(App, {}), document.querySelector<HTMLDivElement>('#app')!)