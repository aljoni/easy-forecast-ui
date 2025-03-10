import {ApiResponse} from "~/types/api/response/ApiResponse";

const API_BASE_URL = "http://localhost:8094";

type BodyValue = string | number | boolean | null;
type Body = Record<string, BodyValue> | BodyValue;

const performRequest = async <T>(method: string, path: string, query: Record<string, string> = {}, body: Body = {}): Promise<ApiResponse<T | null>> => {
    // -- Check local storage for state and shop
    const state = localStorage.getItem("state");
    const shop = localStorage.getItem("shop");

    if (state === null || shop === null) {
        // TODO: Request user re-open the app
        throw new Error("State or shop not found");
    }

    // -- Build URL
    const url = new URL(path, API_BASE_URL);
    for (const [key, value] of Object.entries(query)) {
        url.searchParams.append(key, value);
    }

    // -- Perform request
    const response = await fetch(url.toString(), {
        method,
        headers: {
            "X-State": state,
            "X-Domain": shop,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const rawResponse = await response.text();

    try {
        return JSON.parse(rawResponse);
    } catch (e) {
        return {responseStatus: "OK", payload: null, errors: []};
    }
};

const performGet = async <T>({path, query = {}}: {
    path: string,
    query?: Record<string, string>
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("GET", path, query);
};

const performPost = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("POST", path, query, body);
};

const performUpdate = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("UPDATE", path, query, body);
};

const performPut = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("PUT", path, query, body);
};

const performDelete = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("DELETE", path, query, body);
};

export {performRequest, performGet, performPost, performUpdate, performPut, performDelete};
