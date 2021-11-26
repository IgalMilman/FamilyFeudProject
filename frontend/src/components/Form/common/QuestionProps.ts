import { Question } from "../../../apiclient/models/Question";

export interface QuestionProps {
    question: Question;
    callBack?: (value:any)=>void;
    value?:any;
}