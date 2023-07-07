import axios from "axios";
import { config } from "dotenv";

config({ path: "../../.env" })
interface FileStructure {
    name: string;
    type: "dir" | "file";
    children?: FileStructure[];

}

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
        const response = await axios.get(`https://api.github.com/repos/21omkarsase/Bootstrap/contributors`);

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
interface FileStructure {
    name: string;
    type: 'file' | 'dir';
    children?: FileStructure[];
}

export const fetchRepoFilesStructure = async (username: string, reponame: string, path = ''): Promise<FileStructure[]> => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${reponame}/contents/${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`
            }
        });
        const contents = response.data;

        const fileStructure: FileStructure[] = [];

        for (const item of contents) {
            if (item.type === 'dir') {
                const nestedStructure = await fetchRepoFilesStructure(username, reponame, item.path);
                fileStructure.push({
                    name: item.name,
                    type: 'dir',
                    children: nestedStructure,
                });
            } else {
                fileStructure.push({
                    name: item.name,
                    type: 'file',
                });
            }
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

