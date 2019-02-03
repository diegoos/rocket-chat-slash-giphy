import { ISlashCommand, ISlashCommandPreview, ISlashCommandPreviewItem, SlashCommandContext, SlashCommandPreviewItemType } from '@rocket.chat/apps-engine/definition/slashcommands';

import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';

import { App } from '@rocket.chat/apps-engine/definition/App';

import { giphy } from './giphy';

export class SlashGiphy implements ISlashCommand {
    public command = 'giphy';
    public i18nParamsExample = 'slashcommand_params';
    public i18nDescription = 'command_description';
    public providesPreview = true;

    constructor(private readonly app: App) { }

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const [command] = context.getArguments();
    }

    public async previewer(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<ISlashCommandPreview> {
        const i18nTitle = 'Giphy for: ';
        const gifs = await giphy.getGifs(context.getArguments().join(' '), http, read);
        const items = new Array();

        for (const item of gifs) {
            items.push(
                {
                    id: item.id,
                    type: SlashCommandPreviewItemType.IMAGE,
                    value: item.images.fixed_width.url,
                },
            );
        }

        return { i18nTitle, items };
    }

    public async executePreviewItem(item: ISlashCommandPreviewItem, context: SlashCommandContext, read: IRead,
                                    modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        return await this.sendMessage(context, modify, '', item.value);
    }

    private async sendMessage(context: SlashCommandContext, modify: IModify, text: string, attachment: string): Promise<void> {
        const msg = modify.getCreator()
            .startMessage()
            .setText(text)
            .setRoom(context.getRoom())
            .setSender(context.getSender());

        if (attachment) {
            msg.setAttachments(new Array(
                {
                    imageUrl: attachment,
                },
            ));
        }

        await modify.getCreator().finish(msg);
    }
}
