
export const getUrlParams = (key: string) => {
    let location = document.location;
    // @ts-ignore
    const params = (new URL(location)).searchParams;
    return params.get(key);
}