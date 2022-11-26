import { RealQuestion } from "../../../apiclient/models/RealQuestion";

export interface QuestionProps {
  question: RealQuestion;
  callBack?: (value: any) => void;
  value?: any;
}
