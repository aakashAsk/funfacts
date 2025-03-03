import axios from 'axios';

export const search = async (searchText:string) => {
    let res = await axios.get('/apis/search?search=' + searchText);
    return res.data.data;
}