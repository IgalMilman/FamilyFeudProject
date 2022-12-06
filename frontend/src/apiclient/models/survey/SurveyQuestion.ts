import { MultiLanguage } from "../MultiLanguage";

export class SurveyQuestionParameters {
    min?: number;
    max?: number;
    choices?: string[];
    player_filter?: 'your' | 'oposing' | 'all';
}

export class SurveyQuestion extends MultiLanguage {
    qtype: number;
    priority: number;
    parameters: SurveyQuestionParameters;
}