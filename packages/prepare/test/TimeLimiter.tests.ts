import { TimeLimiter } from '@pixi/prepare';
import { expect } from 'chai';

describe('TimeLimiter', () =>
{
    // eslint-disable-next-line func-names
    it('should limit to stop after time from beginFrame()', function (done)
    {
        this.slow(500);

        const limit = new TimeLimiter(100);

        limit.beginFrame();
        for (let i = 0; i < 20; ++i)
        {
            expect(limit.allowedToUpload()).toBe(true);
        }

        setTimeout(() =>
        {
            expect(limit.allowedToUpload()).toBe(false);

            limit.beginFrame();

            expect(limit.allowedToUpload()).toBe(true);

            done();
        }, 200);
    });
});
