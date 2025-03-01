import axios from 'axios';

export const postFacts = async (data:any) => {
    const res = await axios.post('/apis/fact', data);
    return res.data;
}

export const getFacts = async (limit:number = 0, index:number = 0) => {
    const res = await axios.get(`http://localhost:3000/apis/fact?${limit ? 'limit='+limit : ''}&${index ? 'index='+index : ''}`);
    return res.data.data;
}