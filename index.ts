import {
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

import { SlashGiphy } from './slashcommands';

import { SettingType } from '@rocket.chat/apps-engine/definition/settings';

export class BGiphyApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    public async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
        configuration.slashCommands.provideSlashCommand(new SlashGiphy(this));

        configuration.settings.provideSetting({
            id: 'giphy_api_key',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'giphy_api_key',
            i18nDescription: 'giphy_api_key_desciption',
        });
    }
}
