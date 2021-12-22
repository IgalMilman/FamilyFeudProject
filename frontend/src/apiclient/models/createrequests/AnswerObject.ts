import { MultiTextCreationObject } from "./MultiTextCreationObject";

export class AnswerObject {
    constructor(){
        this.points_value = 0;
        this.people_answered = 0;
    }

    text: MultiTextCreationObject[];
    points_value?: number;
    people_answered?: number;
    correct_value?: number; 
}