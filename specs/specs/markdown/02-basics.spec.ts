import {beforeEach, describe, expect, it} from 'vitest';
import {createMdStreamRenderer} from '@shared/markdown/stream/streamParser';
import {StandardStreamParserOutput} from '@shared/types/markdown/streamParser';
import {waitForMilliseconds} from '../../utils/wait';

describe('MD Stream Parser Streaming', () => {
    let streamRenderer: StandardStreamParserOutput;
    let rootElement: HTMLElement;

    beforeEach(() => {
        rootElement = document.createElement('div');
        streamRenderer = createMdStreamRenderer(rootElement, {skipStreamingAnimation: true});
    });

    it('should render text in a single paragraph', async () => {
        streamRenderer.next('Hello World');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Hello World</p>\n');
    });

    it('should not render text in a single paragraph when all it containers is spaces', async () => {
        streamRenderer.next('    ');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('');
    });

    it('should render text in a p even when it ends with pending sequence', async () => {
        streamRenderer.next('Hello World ##');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Hello World ##</p>\n');
    });

    it('should render text in a p even when it ends with uncompleted sequence followed by # markdown', async () => {
        streamRenderer.next('A##\n# B');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>A##</p>\n<h1>B</h1>\n');
    });

    it('should render text in a p even when it ends with uncompleted sequence followed by other markdown', async () => {
        streamRenderer.next('Hello World ##\n# Header');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Hello World ##</p>\n<h1>Header</h1>\n');
    });

    it('should render short text in a p even when it ends with uncompleted sequence followed by other markdown',
        async () => {
            streamRenderer.next('A#\n# H');
            streamRenderer.complete!();
            await waitForMilliseconds(200);

            expect(rootElement.innerHTML).toBe('<p>A#</p>\n<h1>H</h1>\n');
        },
    );

    it('should render a single paragraph with a line break', async () => {
        streamRenderer.next('Hello World\n');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Hello World</p>\n');
    });

    it('should close a paragraph and start new one after 2 empty lines', async () => {
        streamRenderer.next('Paragraph 1\n\nParagraph 2');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Paragraph 1</p>\n<p>Paragraph 2</p>\n');
    });

    it('should render paragraph followed by heading when separated by 1 line break', async () => {
        streamRenderer.next('Paragraph\n# Header');
        streamRenderer.complete!();
        await waitForMilliseconds(200);

        expect(rootElement.innerHTML).toBe('<p>Paragraph</p>\n<h1>Header</h1>\n');
    });
});
