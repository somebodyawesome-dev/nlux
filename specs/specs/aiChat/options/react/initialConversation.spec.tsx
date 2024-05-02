import {AiChat, ChatItem} from '@nlux-dev/react/src';
import {render} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {adapterBuilder} from '../../../../utils/adapterBuilder';
import {AdapterController} from '../../../../utils/adapters';
import {waitForMdStreamToComplete, waitForRenderCycle} from '../../../../utils/wait';

describe('<AiChat /> + initialConversation prop', () => {
    let adapterController: AdapterController | undefined;

    beforeEach(() => {
        adapterController = adapterBuilder().withFetchText().create();
    });

    afterEach(() => {
        adapterController = undefined;
    });

    describe('When the component is created with an initialConversation', () => {
        it('The initial conversation should be loaded in the chat', async () => {
            // Arrange
            const initialConversation: ChatItem<string>[] = [
                {role: 'ai', message: 'Hello, how can I help you?'},
                {role: 'user', message: 'I need help with my account.'},
                {role: 'ai', message: 'Sure, I can help you with that.'},
            ];

            const aiChat = <AiChat adapter={adapterController!.adapter} initialConversation={initialConversation}/>;
            render(aiChat);
            await waitForMdStreamToComplete(50);

            // Act
            const aiChatDom = document.querySelector('.nlux-AiChat-root')!;

            // Assert
            const incomingMessages = aiChatDom.querySelectorAll('.nlux_msg_incoming');
            expect(incomingMessages.length).toBe(2);
            expect(incomingMessages[0].textContent).toBe('Hello, how can I help you?');
            expect(incomingMessages[1].textContent).toBe('Sure, I can help you with that.');
        });

        it('The initial conversation should be loaded instantly without typing animation', async () => {
            // Arrange
            const initialConversation: ChatItem<string>[] = [
                {
                    role: 'ai',
                    message: 'Hello, how can I help you? This is going to be a very long greeting message. '
                        + 'It is so long that it will be split into multiple lines. It will also showcase that no '
                        + 'typing animation will be shown for this message when it is loaded. This is a very long '
                        + 'message. Trust me.\n'
                        + 'In a message, long and true,\n'
                        + 'Words kept flowing, never few.\n'
                        + 'Stories told with heartfelt grace,\n'
                        + 'In each line, a sacred space.\n\n'
                        + 'Each word a bridge, connecting souls,\n'
                        + 'Across distances, making us whole.\n'
                        + 'Emotions poured, thoughts unfurled,\n'
                        + 'In this message, a treasure world.\n\n'
                        + 'Pages filled with hopes and dreams,\n'
                        + 'In this message, it truly seems,\n'
                        + 'That connection can transcend the miles,\n'
                        + 'In this message, love it files.\n'
                        + 'So let us embrace this lengthy tale,\n'
                        + 'For in its depth, we will prevail.\n'
                        + 'For in a message, long and grand,\n'
                        + 'We find connection, hand in hand.',
                },
                {role: 'user', message: 'I need help with my account.'},
            ];

            const aiChat = <AiChat adapter={adapterController!.adapter} initialConversation={initialConversation}/>;
            render(aiChat);
            await waitForRenderCycle();

            // Act
            const aiChatDom = document.querySelector('.nlux-AiChat-root')!;

            // Assert
            const incomingMessage = aiChatDom.querySelector('.nlux_msg_incoming')!;
            expect(incomingMessage.textContent).toEqual(expect.stringContaining('Hello, how can I help you?'));
            expect(incomingMessage.textContent).toEqual(expect.stringContaining('We find connection, hand in hand'));
        });
    });
});
