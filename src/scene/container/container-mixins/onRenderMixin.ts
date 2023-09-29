import type { Container } from '../Container';

export interface OnRenderMixinConstructor
{
    onRender?: (() => void | null);
}
export interface OnRenderMixin extends OnRenderMixinConstructor
{
    _onRender: (() => void) | null;
}

export const onRenderMixin: Partial<Container> = {
    _onRender: null,

    set onRender(func: () => void)
    {
        const layerGroup = this.layerGroup;

        if (!func)
        {
            if (this._onRender)
            {
                layerGroup?.removeOnRender(this);
            }

            this._onRender = null;

            return;
        }

        if (!this._onRender)
        {
            layerGroup?.addOnRender(this);
        }

        this._onRender = func;
    },

    get onRender(): () => void
    {
        return this._onRender;
    }
} as Container;