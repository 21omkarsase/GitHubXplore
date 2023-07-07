import axios from 'axios';

export const fetchUserInfoAPI = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/${username}`);
    return response.data;
};

export const fetchFollowersAPI = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/followers/${username}`);
    return response.data;
};

export const fetchFollowingsAPI = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/followings/${username}`);
    return response.data;
};

export const fetchOrgsAPI = async (username: string) => {
    const response = await axios.get(`http://localhost:5000/user/orgs/${username}`);
    return response.data;
};
