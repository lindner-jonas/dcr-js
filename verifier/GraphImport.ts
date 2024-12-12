import DCR_Graph from "./Graph";
import DCR_Event_Type from "./Graph";
import DCR_Constraint_Type from "./Graph";
import State from "./Graph";


// import updated xml string from Modeler
// executed after every change in dcr-js
const parser = new DOMParser();
let xmlGraph;
let dcr_graph = new DCR_Graph;

export default function importGraphFromModeler(xml: string): void{
    xmlGraph = parser.parseFromString(xml, "text/xml");
    console.log(xml);
    addNewEvents(dcr_graph,xmlGraph);
    // addNewConstraints(dcr_graph,xmlGraph);

}

function addNewEvents(graph: DCR_Graph, xmlGraph) {
    let xmlEvents = xmlGraph.getElementsByTagName("event");
    for (var xe of xmlEvents){
        let add = true;
        let graphEvents = graph.getAllEvents();
        for (var ge of graphEvents){
            let id = ge.getID();
            if (xe.id === id){
                add = false;
            }
        }
        if (add === true){
            graph.addEvent(xe.id,DCR_Event_Type[2],State[1]);
        }
    }
}


// function addNewConstraints(graph: DCR_Graph, xmlGraph){
//     let relations: string[] = ["condition","response","exclude","include","milestones"];
//     for (var _i = 0; _i < relations.length; _i++){
//         let xmlRelation = xmlGraph.getElementsByTagName(relations[_i]);
//         for (var xr of xmlRelation){
//             let relationID = xmlRelation.getElementsByTagName("id")[0].textContent;
//             let add = true;
//             let graphConstraints = graph.getAllConstraints();
//             for (var gc of graphConstraints){
//                 let id = gc.getID();
//                 if (relationID === id){
//                     add = false;
//                 }
//             }
//             if (add === true){
//                 graph.addConstraint(xr.id,DCR_Constraint_Type[_i]);
//             }
//         }
//     }

// }

// function addNewCondition(graph: DCR_Graph,xml){

// }



