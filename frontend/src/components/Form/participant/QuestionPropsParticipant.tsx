import { QuestionProps } from "../common/QuestionProps";

export interface QuestionPropsParticipant extends QuestionProps {
    teamNumber: 1 | 2;
}