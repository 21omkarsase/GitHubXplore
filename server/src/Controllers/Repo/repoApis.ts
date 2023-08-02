import axios from "axios";
import { config } from "dotenv";

config({ path: "../../.env" })

export const fetchUserPublicRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchUserStarredRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchSingleRepo = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoCommits = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/commits`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoContributors = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contributors`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoIssues = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/issues`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoLanguages = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        return response.data;
    } catch (error) {
        return null;
    }
}


export const fetchRepoFilesStructure = async (username: string, reponame: string, path = '', type: 'dir' | 'file'): Promise<{}[] | string | null> => {
    try {
        if (type == 'dir') {

            const { data } = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contents/${path}`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
                }
            });
            return data;
        }
        else {
            const { data } = await axios.get(`https://raw.githubusercontent.com/${username}/${reponame}/main/${path}`, {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
                }
            });

            if (!data) {
                return [];
            }

            return data;
        }
    } catch (error) {

        return null;
    }
};
export const fetchFileContent = async (username: string, reponame: string, path: string): Promise<string | null> => {
    try {
        const response = await axios.get(`https://raw.githubusercontent.com/${username}/${reponame}/main/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

