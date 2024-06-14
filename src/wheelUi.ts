import {WheelData, WheelTraitData} from "./wheel.ts";
import {h} from 'preact';
import {Dispatch, StateUpdater} from "preact/hooks";
import {produce} from "immer";

export function WheelForm(props: { wheelData: WheelData, setWheelData: Dispatch<StateUpdater<WheelData>> }) {
    let {wheelData, setWheelData} = props;

    return h("div", {}, [
        h("span", {}, [wheelData.title]),
        // TODO: Add title editor
        h("div", {}, wheelData.traits.map((_trait: WheelTraitData, traitIndex: number) => h(WheelTraitForm,{
            wheelData,
            setWheelData,
            traitIndex
        })))
    ])
}

function WheelTraitForm(props: {
    wheelData: WheelData,
    setWheelData: Dispatch<StateUpdater<WheelData>>,
    traitIndex: number
}) {
    let { wheelData, setWheelData, traitIndex } = props;
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

    return h("div", {}, [
        h("input", {type: "text", value: trait.label, onInput: e => setLabel(e.currentTarget.value)}),
        h("input", {type: "number", min: 0, max: 4, value: trait.value, onInput: e => setValue(parseInt(e.currentTarget.value))}),
        h("input", {type: "color", value: trait.colour, onInput: e => setColour(e.currentTarget.value)}),
        h("input", {type: "button", onInput: deleteTrait}, ["x"])
    ])
}
