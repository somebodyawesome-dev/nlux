import {ConversationLayout} from '@nlux/core';

export const conversationLayoutClassName: { [key: string]: string } = {
    bubbles: 'nlux-comp-chatItem--bubblesLayout',
    list: 'nlux-comp-chatItem--listLayout',
};

export const applyNewLayoutClassName = (element: HTMLElement, layout: ConversationLayout) => {
    const layouts = Object.keys(conversationLayoutClassName);
    layouts.forEach((layoutName) => {
        element.classList.remove(conversationLayoutClassName[layoutName]);
    });

    if (conversationLayoutClassName[layout]) {
        element.classList.add(conversationLayoutClassName[layout]);
    }
};
