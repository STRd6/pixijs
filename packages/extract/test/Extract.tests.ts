import { Sprite } from '@pixi/sprite';
import { expect } from 'chai';
import { skipHello } from '@pixi/utils';
import { Texture, RenderTexture, BatchRenderer, Renderer, extensions } from '@pixi/core';
import { Extract } from '@pixi/extract';
import { Rectangle } from '@pixi/math';

skipHello();

describe('Extract', () =>
{
    beforeAll(() => extensions.add(Extract, BatchRenderer));
    afterAll(() => extensions.remove(Extract, BatchRenderer));

    it('should access extract on renderer', () =>
    {
        const renderer = new Renderer();

        expect(renderer.plugins.extract).to.be.an.instanceof(Extract);

        renderer.destroy();
    });

    it('should extract an sprite', () =>
    {
        const renderer = new Renderer();
        const sprite = new Sprite(Texture.WHITE);
        const extract = renderer.plugins.extract as Extract;

        expect(extract.canvas(sprite)).to.be.an.instanceof(HTMLCanvasElement);
        expect(extract.base64(sprite)).to.be.a('string');
        expect(extract.pixels(sprite)).toBeInstanceOf(Uint8Array);
        expect(extract.image(sprite)).toBeInstanceOf(HTMLImageElement);

        renderer.destroy();
        sprite.destroy();
    });

    it('should extract with no arguments', () =>
    {
        const renderer = new Renderer();
        const extract = renderer.plugins.extract as Extract;

        expect(extract.canvas(undefined)).to.be.an.instanceof(HTMLCanvasElement);
        expect(extract.base64(undefined)).to.be.a('string');
        expect(extract.pixels()).toBeInstanceOf(Uint8Array);
        expect(extract.image(undefined)).toBeInstanceOf(HTMLImageElement);

        renderer.destroy();
    });

    it('should extract a render texture', () =>
    {
        const renderer = new Renderer();
        const extract = renderer.plugins.extract as Extract;
        const renderTexture = RenderTexture.create({ width: 10, height: 10 });
        const sprite = new Sprite(Texture.WHITE);
        const frame = new Rectangle(1, 2, 5, 6);

        renderer.render(sprite, { renderTexture });

        expect(extract.canvas(renderTexture)).to.be.an.instanceof(HTMLCanvasElement);
        expect(extract.base64(renderTexture)).to.be.a('string');
        expect(extract.pixels(renderTexture, frame)).toBeInstanceOf(Uint8Array);
        expect(extract.image(renderTexture)).toBeInstanceOf(HTMLImageElement);

        renderer.destroy();
        renderTexture.destroy();
        sprite.destroy();
    });
});
