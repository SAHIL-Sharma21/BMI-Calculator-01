function bmiInMetric(weight: number, height: number){
    if(!weight || !height){
        throw new Error("Please provide weight and height")
    }
    const result = (weight / (height ** 2)).toPrecision(4);
    return result;
}

function bmiInImperial(weight: number, height: number){
    if(!weight || !height){
        throw new Error("Please provide weight and height")
    }
    const result = (703 * weight / (height ** 2)).toPrecision(4);
    return result;
}

export {bmiInMetric, bmiInImperial};