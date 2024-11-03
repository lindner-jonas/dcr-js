import DCR_Graph from "./Graph.ts"


// import updated xml string from Modeler
// executed after every change in dcr-js
let xmlGraph: string = "";

export default function importGraphFromModeler(graph: string): void{
    xmlGraph = graph;
    console.log(xmlGraph);

    const graph1 = new DCR_Graph();
    graph1.addEvent("123", 2,1);
    let sth = graph1.getEvent(0);
    console.log(sth);
}


// build structure



