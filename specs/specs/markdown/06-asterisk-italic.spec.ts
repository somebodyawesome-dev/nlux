import {beforeEach, describe, expect, it} from 'vitest';
import {createMdStreamRenderer} from '../../../packages/shared/src/markdown/stream/streamParser';
import {StandardStreamParserOutput} from '../../../packages/shared/src/types/markdown/streamParser';
import {waitForMdStreamToComplete} from '../../utils/wait';

describe('Asterisk Italic Markdowns Parser', () => {
    let streamRenderer: StandardStreamParserOutput;
    let rootElement: HTMLElement;

    beforeEach(() => {
        rootElement = document.createElement('div');
        streamRenderer = createMdStreamRenderer(rootElement, {skipStreamingAnimation: true});
    });

    it('should render an italic in the middle of a paragraph', async () => {
        streamRenderer.next('Hello *World* !');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p>Hello <em>World</em> !</p>\n');
    });

    it('should render an italic at the end of a paragraph', async () => {
        streamRenderer.next('Hello *World*');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p>Hello <em>World</em></p>\n');
    });

    it('should render an italic at the beginning of a paragraph', async () => {
        streamRenderer.next('*Hello* World');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><em>Hello</em> World</p>\n');
    });

    it('should wrap italic in a paragraph', async () => {
        streamRenderer.next('*Hello World*');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><em>Hello World</em></p>\n');
    });

    it('should embed italic into a paragraph, and code into the italic', async () => {
        streamRenderer.next('*Hello `World`*');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><em>Hello <code>World</code></em></p>\n');
    });

    it('should embed code into a paragraph, and but not embed italic into the code', async () => {
        streamRenderer.next('`Hello *World*`');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><code>Hello *World*</code></p>\n');
    });

    it('should not embed italic at the beginning of inline code', async () => {
        streamRenderer.next('`*Hello* World`');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><code>*Hello* World</code></p>\n');
    });

    it('should not embed italic at the end of inline code', async () => {
        streamRenderer.next('`Hello *World*`');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p><code>Hello *World*</code></p>\n');
    });
});
