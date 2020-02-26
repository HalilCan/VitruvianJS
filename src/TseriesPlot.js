let tCount = 0;
let torsoRuleMinTrace = {
    x: [],
    y: [],
    mode: `lines`,
    name: `Min angle`
}
let torsoRuleMaxTrace = {
    x: [],
    y: [],
    mode: `lines`,
    name: `Max angle`
}
let trace = {
    x: [],
    y: [],
    mode: `lines`,
    name: `Actual angle`
}
var layout = {
    title: 'Upright torso rule time series'
};

let updateTorsoAngleSeries = (angle) => {
    tCount ++;
    trace.x.push(tCount);
    torsoRuleMaxTrace.x.push(tCount);
    torsoRuleMinTrace.x.push(tCount);
    trace.y.push(angle);
    torsoRuleMaxTrace.y.push(1.7);
    torsoRuleMinTrace.y.push(1.5);
    
    let data = [trace, torsoRuleMaxTrace, torsoRuleMinTrace];
    Plotly.newPlot('tseries-graph', data, layout);
}
