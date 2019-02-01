import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';

class Giphy {

    private apiKey = 'nsbtk4EzHPhpuBDwn3pie761Dtf0myC5';

    public async getGifs(term: string, http: IHttp) {

        const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&q=' + term;

        const response = await http.get(url);
        const content = response.content;

        if (content) {
            const gifObjt = JSON.parse(content).data;
            return gifObjt;
        }

    }
}

export const giphy = new Giphy();
