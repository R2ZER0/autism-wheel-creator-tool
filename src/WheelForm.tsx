import {WheelData, WheelTraitData} from "./WheelChart.tsx";
import {h} from 'preact';
import {Dispatch, StateUpdater} from "preact/hooks";
import {produce} from "immer";

const DEFAULT_NEW_TRAIT: WheelTraitData = {
    "label": "New Trait",
    "colour": "#aaaaaa",
    "value": 2,
}

export type WheelFormProps = {
    wheelData: WheelData;
    setWheelData: Dispatch<StateUpdater<WheelData>>;
    saveSvgFn: () => void,
    savePngFn: () => void,
}

export function WheelForm(props: WheelFormProps) {
    let {wheelData, setWheelData} = props;

    const addTrait = () => {
        setWheelData(produce(wheelData, draft => {
            draft.traits.push(DEFAULT_NEW_TRAIT)
        }));
    };

    return <form>
        <div class={"mb-3"}>
            <button className={"btn btn-outline-primary"} type={"button"} onClick={addTrait}>Add Trait</button>
            <div class={"btn-group float-end"}>
                <button className={"btn btn-outline-success"} type={"button"} onClick={props.saveSvgFn}>Save as SVG</button>
                <button className={"btn btn-outline-success"} type={"button"} onClick={props.savePngFn}>PNG</button>
            </div>
        </div>
        <div class={"mb-3"}>
            {wheelData.traits.map((_trait: WheelTraitData, traitIndex: number) => <WheelTraitForm wheelData={wheelData}
                                                                                                  setWheelData={setWheelData}
                                                                                                  traitIndex={traitIndex}/>)}
        </div>
    </form>

}

function WheelTraitForm(props: {
    wheelData: WheelData,
    setWheelData: Dispatch<StateUpdater<WheelData>>,
    traitIndex: number
}) {
    let {wheelData, setWheelData, traitIndex} = props;
    let trait = wheelData.traits[traitIndex];

    let setLabel = (label: string) => {
        setWheelData(produce(wheelData, draft => {
            draft.traits[traitIndex].label = label
        }))
    }

    let setValue = (value: number) => {
        setWheelData(produce(wheelData, draft => {
            draft.traits[traitIndex].value = value
        }))
    }

    let setColour = (colour: string) => {
        setWheelData(produce(wheelData, draft => {
            draft.traits[traitIndex].colour = colour
        }))
    }

    let deleteTrait = () => {
        setWheelData(produce(wheelData, draft => {
            draft.traits.splice(traitIndex, 1)
        }))
    }

    return <div class={"input-group mb-3"}>
        <input class={"form-control"} type={"text"} aria-label="Trait Label" value={trait.label}
               onInput={e => setLabel(e.currentTarget.value)}/>
        <select class={"form-select"} aria-label={"Trait Level"} value={trait.value}
                onInput={e => setValue(parseInt(e.currentTarget.value))}>
            <option value={0}>None</option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
            <option value={4}>Very High</option>
        </select>
        <div class={"input-group-text"}>
            <input className={"form-control form-control-color"} type={"color"} value={trait.colour}
                   aria-label={"Trait Colour"}
                   onInput={e => setColour(e.currentTarget.value)}/>
        </div>
        <button class={"btn input-group-text"} type={"button"} onClick={deleteTrait}><span class={"btn-close"}></span>
        </button>
    </div>
}
