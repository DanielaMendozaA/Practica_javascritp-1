
export function Params() {
    const searchParams = window.location.search;
    const paramsTransformed = new URLSearchParams(searchParams);
    return paramsTransformed
}