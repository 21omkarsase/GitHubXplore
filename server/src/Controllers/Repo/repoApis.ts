import axios from "axios";
import { config } from "dotenv";

config({ path: "../../.env" })

export const fetchUserPublicRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchUserStarredRepos = async (username: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/starred`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchSingleRepo = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}`);

        return response.data;
    } catch (error) {
        console.log("e1", error);

        return null;
    }
}

export const fetchRepoCommits = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/commits`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoContributors = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contributors`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoIssues = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/issues`);

        return response.data;
    } catch (error) {
        return null;
    }
}

export const fetchRepoLanguages = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`);

        return response.data;
    } catch (error) {
        return null;
    }
}


export const fetchRepoFilesStructure = async (username: string, reponame: string, path = '', type: 'dir' | 'file'): Promise<{}[] | string> => {
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
            const fileContent = await fetchFileContent(username, reponame, path);
            return fileContent;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const fetchFileContent = async (username: string, reponame: string, path: string): Promise<string> => {
    try {
        const response = await axios.get(`https://raw.githubusercontent.com/${username}/${reponame}/main/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

