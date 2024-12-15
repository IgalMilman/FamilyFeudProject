import { BetOpportunity } from "../../apiclient/models/BetOpportunity";
import { BaseAppProps } from "../common/AppProps";

export interface BetProps extends BaseAppProps {
    betOpportunity: BetOpportunity;
    questionId?: String;
}