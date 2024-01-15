import {
    Adapter,
    AdapterBuilder,
    ConversationOptions,
    EventsMap,
    HighlighterExtension,
    LayoutOptions,
    PromptBoxOptions,
} from '@nlux/core';
import {PersonaOptions} from './personaOptions';

/**
 * Properties for the AiChat React component.
 */
export type AiChatProps = {
    /**
     * The adapter or adapter builder to use for the conversation.
     * This can be obtained via useAdapter() hook for standard adapters or by creating your own custom adapter
     * that implements `Adapter` or `AdapterBuilder` interfaces.
     */
    adapter: Adapter | AdapterBuilder<any, any>;

    /**
     * Event listeners to be attached to chat room events.
     */
    events?: Partial<EventsMap>;

    /**
     * CSS class name to be applied to the root element.
     */
    className?: string;

    /**
     * The syntax highlighter to use for any source code generated by the LLM
     * and displayed in the conversation.
     */
    syntaxHighlighter?: HighlighterExtension;

    /**
     * The options to use for the conversation.
     */
    conversationOptions?: ConversationOptions;

    /**
     * The options to use for the layout.
     */
    layoutOptions?: LayoutOptions;

    /**
     * The options to use for the prompt box.
     */
    promptBoxOptions?: PromptBoxOptions;

    /**
     * The options to use for the personaOptions.
     */
    personaOptions?: PersonaOptions
};
