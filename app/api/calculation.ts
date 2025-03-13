import {ApiIdResponse} from "~/types/api/response/ApiIdResponse";
import {performGet, performPost, performPut} from "~/api/client";
import {CalculationResult} from "~/types/api/request/CalculationResult";
import {CalculationResultResponse} from "~/types/api/response/CalculationResultResponse";
import {CalculationType} from "~/types/calculation/CalculationType";

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

const getCalculationResult = async (calculationResultId: string): Promise<CalculationResultResponse | null> => {
    const response = await performGet<CalculationResultResponse>({
        path: `/calculation/${calculationResultId}`,
    });

    if (response.responseStatus !== "OK") {
        return null;
    }

    return response.payload;
};

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