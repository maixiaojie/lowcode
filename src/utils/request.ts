/**
 * POST请求
 */
function post(url: string, json: any) {
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                },
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.code === 1) {
                    console.log(json.message)
                    reject(json)
                } else {
                    resolve(json)
                }
            })
            .catch(err => {
                console.log(err)
            });
    })
}
 
/**
 * GET请求
 */
function get(url: string) {
    return new Promise((resolve, reject) =>
        fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.code === 1) {
                console.log(json.message)
                reject(json)
            } else {
                resolve(json)
            }
        })
        .catch(err => {
            console.log(err)
        }))
}
 
export default {
    get,
    post
}