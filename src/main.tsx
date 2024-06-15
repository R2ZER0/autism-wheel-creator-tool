import "preact/debug"

import './style.scss'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'
// @ts-ignore
import {Dropdown} from "bootstrap";


import {h, render} from "preact"
import {WheelData, WheelChart} from './WheelChart.tsx'
import {WheelForm} from "./WheelForm.tsx";
import {useState, useEffect, useRef} from "preact/hooks";
import {saveAsSvg, saveAsPng} from "./saveImages.ts";

// Update this when we change the storage format
const WHEEL_DATA_STORAGE_KEY = "wheel-data-v1";

const WHEEL_DATA_DEFAULT: WheelData = {
    "traits": [
        {"label": "Test 1", "colour": "#77767b", "value": 0},
        {"label": "Test 2", "colour": "#dc8add", "value": 1},
        {"label": "Test 3", "colour": "#ffbe6f", "value": 2},
        {"label": "Test 4", "colour": "#f9f06b", "value": 3},
        {"label": "Test 5", "colour": "#8ff0a4", "value": 4}
    ]
}


function App() {
    let initialData = WHEEL_DATA_DEFAULT;

    // Load data from localstate if available
    const storedData = localStorage.getItem(WHEEL_DATA_STORAGE_KEY)
    if (storedData?.length) {
        try {
            initialData = JSON.parse(storedData);
            console.log("[App]  Loaded previously saved chart.")
        } catch (err) {
            console.warn('[App] Stored data could not be JSON parsed');
        }
    }

    const [wheelData, setWheelData] = useState<WheelData>(initialData);
    const svgRef = useRef<SVGSVGElement>(null);

    const saveSvg = () => {
        if(svgRef.current !== null) {
            saveAsSvg(svgRef.current)
        } else {
            console.warn("[App] Couldn't save SVG - ref is null");
        }
    }

    const savePng = () => {
        if(svgRef.current !== null) {
            saveAsPng(svgRef.current)
        } else {
            console.warn("[App] Couldn't save PNG - ref is null");
        }
    }

    useEffect(() => {
        // Save changes to localstorage
        localStorage.setItem(WHEEL_DATA_STORAGE_KEY, JSON.stringify(wheelData));
    }, [wheelData]);

    return <div class={"container"}>
        <h1 class={"text-center"}>Autism Wheel Creator</h1>
        <WheelForm wheelData={wheelData} setWheelData={setWheelData} saveSvgFn={saveSvg} savePngFn={savePng} />
        <WheelChart wheelData={wheelData} svgRef={svgRef}/>
    </div>
}

render(<App/>, document.querySelector<HTMLDivElement>('#app')!)