import queryString from 'query-string';

const getQueryParams = (url) => {
    let qs;
    if(url) {
        const [, queryParams] = url.split('?');
        qs = queryString.parse(queryParams);
    }
    return qs;
}

const getPaginatedQueryString = (url) => {
    let qs;
    if(url) {
        const [, queryParams] = url.split('?');
        const qsParams = queryString.parse(queryParams);
        qs = Object.entries(qsParams).map(([key, value]) => `${key}:${value}`).join("_");
    }
    return qs;
}

export {
    getQueryParams,
    getPaginatedQueryString
}