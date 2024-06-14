import "preact/debug"

import './style.css'
import {h, render} from "preact"
import {WheelData, WheelChart} from './wheel.tsx'
import {WheelForm} from "./wheelUi.tsx";
import {useState, useEffect} from "preact/hooks";

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

    let [wheelData, setWheelData] = useState<WheelData>(initialData);

    useEffect(() => {
        // Save changes to localstorage
        localStorage.setItem(WHEEL_DATA_STORAGE_KEY, JSON.stringify(wheelData));
    }, [wheelData]);

    return <div>
        <WheelForm wheelData={wheelData} setWheelData={setWheelData}/>
        <WheelChart wheelData={wheelData}/>
    </div>
}

render(<App/>, document.querySelector<HTMLDivElement>('#app')!)