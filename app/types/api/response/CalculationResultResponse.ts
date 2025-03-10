import {CalculationType} from "~/types/calculation/CalculationType";

type CalculationResultResponse = {
    id: string;
    name: string;
    calculationType: CalculationType;
    userData: string;
};

export type {CalculationResultResponse};