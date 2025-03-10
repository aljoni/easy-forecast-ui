import {CalculationType} from "~/types/calculation/CalculationType";

type CalculationResult = {
    name: string;
    calculationType: CalculationType;
    userData: string;
};

export type {CalculationResult};