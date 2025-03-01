import axios from 'axios';

export const getAllCategories = async () => {
    const res = await axios.get('http://localhost:3000/apis/category');
    return res.data.data;
}