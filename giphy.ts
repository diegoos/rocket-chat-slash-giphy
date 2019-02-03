import { IHttp, IRead } from '@rocket.chat/apps-engine/definition/accessors';

class Giphy {

    public async getGifs(term: string, http: IHttp, read: IRead) {
        const settings = read.getEnvironmentReader().getSettings();
        const apiKey = await settings.getValueById('giphy_api_key');

        const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + term;

        const response = await http.get(url);
        const content = response.content;

        if (content) {
            const gifObjt = JSON.parse(content).data;
            return gifObjt;
        }

    }
}

export const giphy = new Giphy();
