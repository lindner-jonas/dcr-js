import DCR_Graph from "./Graph";
import DCR_Event_Type from "./Graph";
import DCR_Constraint_Type from "./Graph";
import State from "./Graph";


// import updated xml string from Modeler
// executed after every change in dcr-js
const parser = new DOMParser();
let xmlGraph;
let dcr_graph = new DCR_Graph;
let events = new Map();
let terms: [string,any,any][];

export default function importGraphFromModeler(xml: string): void{
    xmlGraph = parser.parseFromString(xml, "text/xml");
    console.log(xml);
    getEvents(xmlGraph);
    console.log(terms);
    getTerms(xmlGraph);

    //addNewEvents(dcr_graph,xmlGraph);
    // addNewConstraints(dcr_graph,xmlGraph);

}

function getTerms(xmlGraph){
    let xmlEvents = xmlGraph.getElementsByTagName("events")[0].childNodes;
    let conditions = xmlGraph.getElementsByTagName("conditions")[0].childNodes;

    for (let i = 1; i < conditions.length - 1 ; i++){
        if(i % 2 == 1){
            const source = conditions[i].sourceId;
            const target = conditions[i].targetId;
            terms.push(["condition",source,target]);
        }
    }

    console.log(terms);
    //console.log(terms[0]);
}

function getEvents(xmlGraph){
   let xmlEvents = xmlGraph.getElementsByTagName("events")[0].childNodes;
   let includedEvents = xmlGraph.getElementsByTagName("included")[0].childNodes;
   let happenedEvents = xmlGraph.getElementsByTagName("executed")[0].childNodes;
   let pendingEvents = xmlGraph.getElementsByTagName("pendingResponses")[0].childNodes;   

   //console.log(xmlEvents);
    for (let i = 1; i < xmlEvents.length - 1 ; i++){
        if(i % 2 == 1){
            //console.log(xmlEvents[i]);
            const id = xmlEvents[i].id;
            let included = false;
            let happened = false;
            let pending = false;
    
            for (let i = 1; i < happenedEvents.length - 1 ; i++) {
                if(i % 2 == 1){
                    var e_hap = happenedEvents[i].id
                    if (id == e_hap){
                        happened = true;
                    }
                }
            }
    
            for (let i = 1; i < includedEvents.length - 1 ; i++) {
                if(i % 2 == 1){
                    var e_inc = includedEvents[i].id
                    if (id == e_inc){
                        included = true;
                    }
                }
            }
    
            for (let i = 1; i < pendingEvents.length - 1 ; i++) {
                if(i % 2 == 1){
                    var e_pen = pendingEvents[i].id
                    if (id == e_pen){
                        pending = true;
                    }
                }
            }
            let e_state = [happened,included,pending];
            events.set(id,e_state);
        }

    }

    // console.log(includedEvents);
    // events.forEach((value,key) => {
    //     console.log(`ID: ${key}, Value:${value}`);
    //     console.log(value[1]);
    // })
}

// function addNewEvents(graph: DCR_Graph, xmlGraph) {
//     let xmlEvents = xmlGraph.getElementsByTagName("event");
//     for (var xe of xmlEvents){
//         let add = true;
//         let graphEvents = graph.getAllEvents();
//         for (var ge of graphEvents){
//             let id = ge.getID();
//             if (xe.id === id){
//                 add = false;
//                 console.log(id);
//             }
//         }
//         if (add === true){
//             graph.addEvent(xe.id,DCR_Event_Type[2],State[1]);
//         }
//     }
//     console.log("test2");

// }

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



