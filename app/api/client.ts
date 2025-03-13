import {ApiResponse} from "~/types/api/response/ApiResponse";

const API_BASE_URL = "http://localhost:8094";

type BodyValue = string | number | boolean | null;
type Body = Record<string, BodyValue> | BodyValue;

/**
 * Performs a request to the backend API.
 *
 * @param method HTTP method
 * @param path   API path
 * @param query  Optional query parameters
 * @param body   Optional request body
 *
 * @returns API response
 */
const performRequest = async <T>(method: string, path: string, query: Record<string, string> = {}, body: Body = {}): Promise<ApiResponse<T | null>> => {
    // -- Check local storage for state and shop
    const state = localStorage.getItem("state");
    const shop = localStorage.getItem("shop");

    if (state === null || shop === null) {
        // TODO: Request user re-open the app
        console.error("[client] state or shop not found");
        return {responseStatus: "ERROR", payload: null, errors: []};
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
        body: method !== "GET" ? JSON.stringify(body) : undefined,
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

/**
 * Performs a GET request to the backend API.
 *
 * @param path   API path
 * @param query  Optional query parameters
 *
 * @returns API response
 */
const performGet = async <T>({path, query = {}}: {
    path: string,
    query?: Record<string, string>
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("GET", path, query);
};

/**
 * Performs a POST request to the backend API.
 *
 * @param path   API path
 * @param query  Optional query parameters
 * @param body   Optional request body
 *
 * @returns API response
 */
const performPost = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("POST", path, query, body);
};

/**
 * Performs an UPDATE request to the backend API.
 *
 * @param path   API path
 * @param query  Optional query parameters
 * @param body   Optional request body
 *
 * @returns API response
 */
const performUpdate = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("UPDATE", path, query, body);
};

/**
 * Performs a PUT request to the backend API.
 *
 * @param path   API path
 * @param query  Optional query parameters
 * @param body   Optional request body
 *
 * @returns API response
 */
const performPut = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>,
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("PUT", path, query, body);
};

/**
 * Performs a DELETE request to the backend API.
 *
 * @param path   API path
 * @param query  Optional query parameters
 * @param body   Optional request body
 *
 * @returns API response
 */
const performDelete = async <T>({path, query = {}, body = null}: {
    path: string,
    query?: Record<string, string>
    body?: Body
}): Promise<ApiResponse<T | null>> => {
    return await performRequest<T>("DELETE", path, query, body);
};

export {performRequest, performGet, performPost, performUpdate, performPut, performDelete};
