import {ApiIdResponse} from "~/types/api/response/ApiIdResponse";
import {performGet, performPost, performPut} from "~/api/client";
import {CalculationResult} from "~/types/calculation/CalculationResult";
import {CalculationResultResponse} from "~/types/api/response/CalculationResultResponse";
import {CalculationType} from "~/types/calculation/CalculationType";

/**
 * Saves a calculation result to the backend.
 *
 * @param calculationResult Calculation result to save
 *
 * @returns API response
 */
const saveCalculationResult = async (calculationResult: CalculationResult): Promise<ApiIdResponse | null> => {
    const response = await performPost<ApiIdResponse>({
        path: "/calculation",
        body: calculationResult,
    });

    if (response.responseStatus !== "OK") {
        return null;
    }

    return response.payload;
};

/**
 * Updates an existing calculation result in the backend.
 *
 * @param calculationResultId Calculation result ID
 * @param calculationResult   Calculation result to update
 *
 * @returns API response
 */
const updateCalculationResult = async (calculationResultId: string, calculationResult: CalculationResult): Promise<ApiIdResponse | null> => {
    const response = await performPut<ApiIdResponse>({
        path: `/calculation/${calculationResultId}`,
        body: calculationResult,
    });

    if (response.responseStatus !== "OK") {
        return null;
    }

    return response.payload;
};

/**
 * Gets a calculation result from the backend.
 *
 * @param calculationResultId Calculation result ID
 *
 * @returns Calculation result response
 */
const getCalculationResult = async (calculationResultId: string): Promise<CalculationResultResponse | null> => {
    const response = await performGet<CalculationResultResponse>({
        path: `/calculation/${calculationResultId}`,
    });

    if (response.responseStatus !== "OK") {
        return null;
    }

    return response.payload;
};

/**
 * Gets all calculation results for a given calculation type from the backend.
 *
 * @param calculationType Calculation type
 *
 * @returns Calculation result responses
 */
const getCalculationResults = async (calculationType?: CalculationType): Promise<CalculationResultResponse[] | null> => {
    const response = await performGet<CalculationResultResponse[]>({
        path: "/calculation",
        query: calculationType ? {calculationType} : undefined,
    });

    if (response.responseStatus !== "OK") {
        return null;
    }

    return response.payload;
};

export {
    saveCalculationResult,
    updateCalculationResult,
    getCalculationResult,
    getCalculationResults,
};