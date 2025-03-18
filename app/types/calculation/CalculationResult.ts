import { CalculationType } from "~/types";

type CalculationResult = {
    id?: string;
    name: string;
    calculationType: CalculationType;
    userData: string;
};

export type { CalculationResult };