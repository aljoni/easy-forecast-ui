type ApiResponse<T> = {
    responseStatus: string;
    payload: T;
    errors?: ErrorDetail[];
};

type ErrorDetail = {
    errorCode: string;
    field: string;
    message: string;
};

export type { ApiResponse, ErrorDetail };