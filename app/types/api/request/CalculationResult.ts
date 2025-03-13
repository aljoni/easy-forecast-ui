import {CalculationType} from "~/types/calculation/CalculationType";

type CalculationResult = {
    id?: string;
    name: string;
    calculationType: CalculationType;
    userData: string;
};

export type {CalculationResult};