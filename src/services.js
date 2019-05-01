import axios from 'axios';

export function makeGetRequest(url = "") {
    return axios({
        method: "get",
        url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
}