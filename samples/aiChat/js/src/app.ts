import './style.css';
import '@nlux-dev/themes/src/luna/theme.css';
import '@nlux-dev/highlighter/src/themes/stackoverflow/dark.css';
import {ChatItem, createAiChat} from '@nlux-dev/core/src';
import {createChatAdapter} from '@nlux-dev/nlbridge/src';
import {createUnsafeChatAdapter} from '@nlux-dev/openai/src';

document.addEventListener('DOMContentLoaded', () => {
    const parent = document.getElementById('root')!;

    const adapter = createChatAdapter<string>()
        .withUrl('http://localhost:8899/');

    const initialConversation: ChatItem<string>[] = [
        {
            role: 'ai',
            message: 'Hello, [how can I help you](http://questions.com)? This is going to be a very long greeting '
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
        {role: 'ai', message: 'Sure, I can help you with that.'},
    ];

    const openAiAdapter = createUnsafeChatAdapter()
        .withApiKey('sk_1234567890')
        .withDataTransferMode('fetch');

    const aiChat = createAiChat()
        .withAdapter(openAiAdapter)
        .withInitialConversation(initialConversation)
        .withPromptBoxOptions({
            placeholder: 'Type your prompt here',
            autoFocus: true,
            // submitShortcut: 'CommandEnter',
        })
        .withConversationOptions({
            autoScroll: true,
        })
        .withLayoutOptions({
            width: 400,
            height: 300,
        })
        .withMessageOptions({
            openMdLinksInNewWindow: true,
        });

    aiChat.mount(parent);

    aiChat.updateProps({
        // syntaxHighlighter: highlighter,
    });
});
