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
let eventsArray:string[] = [];
//type x = [string,any,any];
let terms:[string,any,any][] = [];
const filename = "dcrModel.smv";


export default function importGraphFromModeler(xml: string): void{
    xmlGraph = parser.parseFromString(xml, "text/xml");
    events.clear();
    getEvents(xmlGraph);
    eventsArray = [];
    events.forEach((value: boolean[], id: string) => {
        eventsArray.push(id);
    });  
    terms = [];
    getTerms(xmlGraph);
    
    var file = 0 < eventsArray.length? createText() : "you need at least one event!";

    //console.log(file);
    download(filename,file);
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}


function createText(){

    var outerFile = "";
    events.forEach((value: boolean[], id: string) => {
        outerFile += createEventModules(id);
    });    
    outerFile += createMainDet();

    return outerFile
}

function addExecutionLine(constraint,enabledSet){
    var innerFile = "";
    if (0 < enabledSet.length){
        innerFile += "    " + constraint  + " : {"
        for (let i = 0; i < enabledSet.length; i++) {
            innerFile += enabledSet[i] + ","
        }
        innerFile = innerFile.substring(0, innerFile.length - 1) //delete last comma
        innerFile += "};\n"
    }
    return innerFile
}

function createExecution(eventCounter,constraint,enabledSet){
    var innerFile = ""
    var innerPositives = enabledSet.slice();
    var innerNegatives = enabledSet.slice();
    if (eventCounter < eventsArray.length){
        eventCounter += 1;
        //FALSE
        if(eventCounter == 1){
            var constraintFalse = constraint + "!" + eventsArray[eventCounter-1] + ".is_enabled"
        } else{
            var constraintFalse = constraint + " & !" + eventsArray[eventCounter-1] + ".is_enabled"
        }
        innerFile += createExecution(eventCounter,constraintFalse,innerNegatives)

        //TRUE

        if(innerPositives.indexOf(eventsArray[eventCounter-1]) === -1) innerPositives.push(eventsArray[eventCounter-1]);
        if(eventCounter == 1){
            var constraintTrue = constraint + eventsArray[eventCounter-1] + ".is_enabled"
        } else{
            var constraintTrue = constraint + " & " + eventsArray[eventCounter-1] + ".is_enabled"
        }
        innerFile += createExecution(eventCounter,constraintTrue,innerPositives)

        // var positivesTrue: string[] = [];
        // positivesTrue = positives;
        // positivesTrue.push(eventsArray[eventCounter-1])
        // if(eventCounter == 1){
        //     var constraintFalse = constraint + eventsArray[eventCounter-1] + ".is_enabled"
        // } else{
        //     var constraintFalse = constraint + " & " + eventsArray[eventCounter-1] + ".is_enabled"
        // }
        // innerFile += createExecution(eventCounter,constraintFalse,positivesTrue)
    } else if(eventCounter == eventsArray.length){
        innerFile += addExecutionLine(constraint,enabledSet);
    }
    return innerFile
}

function createMainDet(){
    
    var innerFile = "";
    innerFile += "MODULE main \n"
    
    // VARIABLES
    innerFile += " VAR\n  "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ": " + id + "("
        for (let i = 0; i < 3 ; i++) {
            if (value[i] == true){
                innerFile += "TRUE,"
            }else(
                innerFile += "FALSE,"
            )
        }
        innerFile += "self);\n  "
    });

    innerFile += "\n  execution : {null"
    events.forEach((value: boolean[], id: string) => {
        innerFile += "," + id
    });
    innerFile += "};\n\n"

    // ASSIGNMENT
    var enabledSet = [];
    var eventCounter = 0;
    var constraint = "";

    innerFile += " ASSIGN\n  init(execution) := null;\n  next(execution) :=\n   case\n"
    innerFile += createExecution(eventCounter,constraint,enabledSet)
    innerFile += "    TRUE : execution;\n   esac;\n\n"

    // DEFINITIONS
    innerFile += " DEFINE\n  is_enabled := "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ".is_enabled | "
    });
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last |
    innerFile += ";\n  is_accepted := "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ".is_accepted & "
    });
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last &
    innerFile += ";\n\n"

    // CTL SPECIFICATION
    innerFile += " CTLSPEC\n "
    // deadlock-freedom
    innerFile += "   AG ( is_enabled | is_accepted ) -- deadlock-freedom\n"
    // livelock-freedom
    innerFile += "  & "
    innerFile += "AG EF is_accepted -- livelock-freedom\n"
    // consistency-freedom
    innerFile += "  & "
    innerFile += "EF is_enabled -- consistency\n"
    // absence of dead activities
    innerFile += "  & ("
    events.forEach((value: boolean[], id: string) => {
        innerFile += "(EF " + id + ".is_enabled) & "
    });    
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last &
    innerFile += ") -- absence of dead activities\n"


    /*   
      AG ( is_enabled | is_accepted ) -- deadlock-freedom
    & AG EF is_accepted -- livelock-freedom (less restriced version)
    & ((EF -E_V-.is_enabled) & (EF -E_V-.is_enabled) & (EF -E_V-.is_enabled) & (EF -E_V-.is_enabled)) -- absence of dead activities ### start + loop event names + end
    & EF is_enabled -- consistency
    */

    return innerFile
}

function createMainNonDet(){
    
    var innerFile = "";
    innerFile += "MODULE main \n"
    
    // VARIABLES
    innerFile += " VAR\n  "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ": " + id + "("
        for (let i = 0; i < 3 ; i++) {
            if (value[i] == true){
                innerFile += "TRUE,"
            }else(
                innerFile += "FALSE,"
            )
        }
        innerFile += "self);\n  "
    });

    innerFile += "\n  execution : {null"
    events.forEach((value: boolean[], id: string) => {
        innerFile += "," + id
    });
    innerFile += "};\n\n"

    // ASSIGNMENT
    innerFile += " ASSIGN\n  init(execution) := null;\n  next(execution) := {"
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ","
    });    
    innerFile = innerFile.substring(0, innerFile.length - 1) //delete last comma
    innerFile += "};\n\n"

    // DEFINITIONS

    innerFile += " DEFINE\n  is_enabled := "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ".is_enabled | "
    });
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last |
    innerFile += ";\n  is_accepted := "
    events.forEach((value: boolean[], id: string) => {
        innerFile += id + ".is_accepted & "
    });
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last &
    innerFile += ";\n\n"

    // CTL SPECIFICATION

    innerFile += " CTLSPEC\n "

    // deadlock-freedom
    innerFile += "   AG ( is_enabled | is_accepted ) -- deadlock-freedom\n"

    // livelock-freedom
    innerFile += "  & "
    innerFile += "AG EF is_accepted -- livelock-freedom\n"

    // consistency-freedom
    innerFile += "  & "
    innerFile += "EF is_enabled -- consistency\n"

    // absence of dead activities
    innerFile += "  & ("
    events.forEach((value: boolean[], id: string) => {
        innerFile += "(EF " + id + ".is_enabled) & "
    });    
    innerFile = innerFile.substring(0, innerFile.length - 3) //delete last &
    innerFile += ") -- absence of dead activities\n"


    /*   
      AG ( is_enabled | is_accepted ) -- deadlock-freedom
    & AG EF is_accepted -- livelock-freedom (less restriced version)
    & ((EF -E_V-.is_enabled) & (EF -E_V-.is_enabled) & (EF -E_V-.is_enabled) & (EF -E_V-.is_enabled)) -- absence of dead activities ### start + loop event names + end
    & EF is_enabled -- consistency
    */

    return innerFile
}

function createEventModules(id){
    
    var innerFile = "";
    innerFile += "MODULE " + id + "(h,i,p,my_graph)\n"

    // VARIABLES
    innerFile += " VAR\n  happened : boolean;\n  included : boolean;\n  pending : boolean;\n\n"

    // ASSIGNMENT
    innerFile += " ASSIGN\n  init(happened) := h;\n  init(included) := i;\n  init(pending) := p;\n"
    //happened
    innerFile += "  next(happened) :=\n   case\n    is_enabled & my_graph.execution = " + id
    // for (let i = 0; i < terms.length; i++){
    //     if(terms[i][0] == "milestone" && terms[i][2] == id){
    //         innerFile += " & (!my_graph." + terms[i][1] + ".pending | (my_graph." + terms[i][1] + ".pending & !my_graph." + terms[i][1] + ".included))"
    //     }
    // }
    innerFile += " : TRUE;\n    TRUE : happened;\n   esac;\n"
    // included
    var included_empty = true;
    innerFile += "  next(included) := "
    for (let i = 0; i < terms.length; i++){
        if(terms[i][0] == "exclude" && terms[i][2] == id){
            if(included_empty){
                innerFile += "\n   case\n"
                included_empty = false;
            }
            innerFile += "    my_graph." + terms[i][1] + ".is_enabled & my_graph.execution = " + terms[i][1] + " : FALSE; -- excluded\n"
        }
        if(terms[i][0] == "include" && terms[i][2] == id){
            if(included_empty){
                innerFile += "\n   case\n"
                included_empty = false;
            }
            innerFile += "    my_graph." + terms[i][1] + ".is_enabled & my_graph.execution = " + terms[i][1] + " : TRUE; -- included\n"
        }
    }
    if (included_empty){
        innerFile += "included;\n"
    } else{
        innerFile += "    TRUE : included;\n   esac;\n"
    }
    // pending
    innerFile += "  next(pending) :=\n   case\n    is_enabled & my_graph.execution = " + id + " : FALSE;\n"
    for (let i = 0; i < terms.length; i++){
        if(terms[i][0] == "response" && terms[i][2] == id){
            innerFile += "    my_graph." + terms[i][1] + ".is_enabled & my_graph.execution = " + terms[i][1] + " : TRUE; -- response \n"
        }
    }
    innerFile += "    TRUE : pending;\n   esac;\n\n"    


    // DEFINITIONS
    innerFile += " DEFINE\n  is_enabled := included"
    for (let i = 0; i < terms.length; i++){
        if(terms[i][0] == "condition" && terms[i][2] == id){
            innerFile += " & ( my_graph." + terms[i][1] + ".happened | !my_graph." + terms[i][1] + ".included)"
        }
        if(terms[i][0] == "milestone" && terms[i][2] == id){
            innerFile += " & (!my_graph." + terms[i][1] + ".pending | (my_graph." + terms[i][1] + ".pending & !my_graph." + terms[i][1] + ".included))"
        }    
    } 
    innerFile += ";\n"
    innerFile += "  is_accepted := !pending | (pending & !included);\n\n"

    return innerFile
}

function getTerms(xmlGraph){
    let xmlEvents = xmlGraph.getElementsByTagName("events")[0].childNodes;
    let conditions = xmlGraph.getElementsByTagName("conditions")[0].childNodes;
    let responses = xmlGraph.getElementsByTagName("responses")[0].childNodes;
    let excludes = xmlGraph.getElementsByTagName("excludes")[0].childNodes;
    let includes = xmlGraph.getElementsByTagName("includes")[0].childNodes;
    let milestones = xmlGraph.getElementsByTagName("milestones")[0].childNodes;

    for (let i = 1; i < conditions.length - 1 ; i++){
        if(i % 2 == 1){
            var source= conditions[i].getAttribute('sourceId');
            var target = conditions[i].getAttribute('targetId');
            terms.push(["condition",source,target]);
        }
    }

    for (let i = 1; i < responses.length - 1 ; i++){
        if(i % 2 == 1){
            var source= responses[i].getAttribute('sourceId');
            var target = responses[i].getAttribute('targetId');
            terms.push(["response",source,target]);
        }
    }

    for (let i = 1; i < excludes.length - 1 ; i++){
        if(i % 2 == 1){
            var source= excludes[i].getAttribute('sourceId');
            var target = excludes[i].getAttribute('targetId');
            terms.push(["exclude",source,target]);
        }
    }

    for (let i = 1; i < includes.length - 1 ; i++){
        if(i % 2 == 1){
            var source= includes[i].getAttribute('sourceId');
            var target = includes[i].getAttribute('targetId');
            terms.push(["include",source,target]);
        }
    }

    for (let i = 1; i < milestones.length - 1 ; i++){
        if(i % 2 == 1){
            var source= milestones[i].getAttribute('sourceId');
            var target = milestones[i].getAttribute('targetId');
            terms.push(["milestone",source,target]);
        }
    }

    //console.log(terms);
}

function getEvents(xmlGraph){
   let xmlEvents = xmlGraph.getElementsByTagName("events")[0].childNodes;
   let includedEvents = xmlGraph.getElementsByTagName("included")[0].childNodes;
   let happenedEvents = xmlGraph.getElementsByTagName("executed")[0].childNodes;
   let pendingEvents = xmlGraph.getElementsByTagName("pendingResponses")[0].childNodes;   

    for (let i = 1; i < xmlEvents.length - 1 ; i++){
        if(i % 2 == 1){
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
}