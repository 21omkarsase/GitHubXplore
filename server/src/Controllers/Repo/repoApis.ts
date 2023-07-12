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

export const fetchRepoLanguages = async (username: string, reponame: string): Promise<{}[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`);

        return response.data;
    } catch (error) {
        return null;
    }
}


export const fetchRepoFilesStructure = async (username: string, reponame: string, path = ''): Promise<{}[]> => {
    try {
        console.log(path);
        console.log(`https://api.github.com/repos/${username}/${reponame}/contents/${path}`);
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contents/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });
        const contents = response.data;

        const fileStructure = [];
        if (Array.isArray(contents)) {

            for (const item of contents) {
                fileStructure.push({
                    name: item.name,
                    type: 'dir',
                });
            }
        } else {
            fileStructure.push({
                name: contents.name,
                type: 'file',
            });
        }

        return fileStructure;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const fetchFileContent = async (username: string, reponame: string, path: string): Promise<string> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contents/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });

        const fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8');

        return fileContent;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

