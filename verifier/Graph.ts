enum State {
    pending,
    included,
    excluded,
    executed
}

enum DCR_Event_Type {
    subprocess,
    nesting,
    event
}

enum DCR_Constraint_Type{
    condition,
    response,
    exclude,
    include,
    milestone
}

class DCR_Event {
    private id: string;
    private type: DCR_Event_Type;
    private property: State;

    constructor(id: string, type: DCR_Event_Type, property: State) {
        this.id = id;
        this.type = type;
        this.property = property;
    }

    public getID(): string{
        return this.id
    }
}

class DCR_Constraint {
    private id: string;
    private type: DCR_Constraint_Type;

    constructor(id: string, type: DCR_Constraint_Type){
        this.id = id;
        this.type = type;
    }
    
    public getID(): string{
        return this.id
    }
}

class DCR_Relation {
    private fromEvent: DCR_Event;
    private toEvent: DCR_Event;
    private connector: DCR_Constraint;

    constructor(fromEvent: DCR_Event, toEvent: DCR_Event, connector: DCR_Constraint){
        this.fromEvent = fromEvent;
        this.toEvent = toEvent;
        this.connector = connector;
    }
}

export default class DCR_Graph{

    private events: DCR_Event[];
    private constraints: DCR_Constraint[];
    private relations: DCR_Relation[];
    private included: string[];
    private excluded: string[];
    private pending: string[];
    private executed: string[];

    private check: boolean[];
    private soundness: boolean[];

    // private consistent: [check: boolean, sound: boolean];
    // private deadlock_free: [check: boolean, sound: boolean];
    // private livelock_free: [check: boolean, sound: boolean];
    // private timelock_free: [check: boolean, sound: boolean];
    // private dead_activity: [check: boolean, sound: boolean];


    constructor(){
        this.events = [];
        this.constraints = [];
        this.relations = [];
        this.included = [];
        this.excluded = [];
        this.pending = [];
        this.executed = [];
        this.check = [false,false,false,false,false];
        this.soundness = [true,true,true,true,true];
        // this.consistent = [false,true];
        // this.deadlock_free = [false,true];
        // this.livelock_free = [false,true];
        // this.timelock_free = [false,true];
        // this.dead_activity = [false,true];
    }

    // create(events: DCR_Event[], constraints: DCR_Constraint[], relations: DCR_Relation[], included: string[], excluded: string[], pending: string[]), executed: string[]{
    //     this.events = events;
    //     this.constraints = constraints;
    //     this.relations = relations;
    //     this.included = included;
    //     this.excluded = excluded;
    //     this.pending = pending;
    //     this.executed = executed;
    // }
    
    public addEvent(id: string, type: DCR_Event_Type, property: State) {
        this.events.push(new DCR_Event(id, type, property));
    }

    public getEvent(e: number): DCR_Event {
        return this.events[e];
    }

    public getAllEvents(): DCR_Event[] {
        return this.events;
    }

    public addConstraint(id: string, type: DCR_Constraint_Type){
        this.constraints.push(new DCR_Constraint(id,type));
    }

    public getConstraint(c: number): DCR_Constraint{
        return this.constraints[c];
    }

    public getAllConstraints(): DCR_Constraint[] {
        return this.constraints;
    }

    public addRelation(fromEvent: DCR_Event, toEvent: DCR_Event, connector: DCR_Constraint){
        this.relations.push(new DCR_Relation(fromEvent, toEvent, connector));
    }

    public getRelation(c: number): DCR_Relation{
        return this.relations[c];
    }

    public includeEvent(id: string){
        this.included.push(id);
    }

    public getIncludedEvent(i: number): string{
        return this.included[i];
    }

    public getAllIncluded(): string[]{
        return this.included;
    }

    public excludeEvent(id: string){
        this.excluded.push(id);
    }

    public getExcludedEvent(e: number): string{
        return this.excluded[e];
    }

    public getAllExcluded(): string[]{
        return this.excluded;
    }

    public executeEvent(id: string){
        this.executed.push(id);
    }

    public getExecutedEvent(e: number): string{
        return this.executed[e];
    }

    public getAllExecuted(): string[]{
        return this.executed;
    }

    public setPending(id: string){
        this.pending.push(id);
    }

    public getPendingEvent(p: number): string{
        return this.pending[p];
    }

    public getAllPending(): string[]{
        return this.pending;
    }

    public setCheckValue(property: number, check: boolean){
        this.check[property] = check;
    }

    public setSoundnessValue(property: number, sound: boolean){
        this.soundness[property] = sound;
    }

}







// dcr graph
// // specification
// // // resources
// // // // events
// // // // // event
// // // // // // id = subprocess
// // // // // // // event
// // // // // // id = nesting
// // // // // // // event
// // // // // // id = event
// // // // subProcesses
// // // // labels
// // // // labelMapping
// // // // variables
// // // // expressions
// // // // variableAccesses
// // // constraints
// // // // 