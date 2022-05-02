import React from 'react';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';

import ReactEditList, * as REL from 'react-edit-list';

import {schema, data, onLoad} from './data';

describe('onUpdate()', () => {
    it('onUpdate() undefined', async () => {
        let recvItem: REL.Row = {};
        let oldItem: REL.Row = {};
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): void => {
            recvItem = item;
            oldItem = old;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'new Desk'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));

        await waitFor(() => expect(recvItem.product).toBe('new Desk'));
        expect(onUpdate).toBeCalledTimes(1);
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        expect(oldItem.product).toBe('Desk');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() false', async () => {
        let recvItem: REL.Row = {};
        let oldItem: REL.Row = {};
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): false => {
            recvItem = item;
            oldItem = old;
            return false;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'Desk 2'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));

        await waitFor(() => expect(recvItem.product).toBe('Desk 2'));
        expect(onUpdate).toBeCalledTimes(1);
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        expect(oldItem.product).toBe('Desk');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(3));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() replace', async () => {
        let recvItem: REL.Row = {};
        const onUpdate = jest.fn((item: REL.Row): Promise<REL.Row> => {
            recvItem = item;
            const modified = {...item};
            modified.product = 'different';
            return Promise.resolve(modified);
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'test item 3'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));

        await waitFor(() => expect(recvItem.product).toBe('test item 3'));
        expect(onUpdate).toBeCalledTimes(1);
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        await waitFor(() => expect(r.getByText(/different/)));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() w/enum w/custom editor', async () => {
        let recvItem: REL.Row = {};
        let oldItem: REL.Row = {};
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): void => {
            recvItem = item;
            oldItem = old;
        });
        const r = render(
            <ReactEditList
                edit={{
                    product: (props) => <div className='customEditor'>{props.value as string}</div>
                }}
                editProps={{price: {max: 2000}}}
                schema={schema}
                onLoad={onLoad}
                onUpdate={onUpdate}
            />
        );
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(2));
        expect(r.container.innerHTML).toMatchSnapshot();

        const selects = r.container.querySelectorAll('select');
        fireEvent.change(selects[0], {target: {value: '2'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));

        await waitFor(() => expect(recvItem.product).toBe('Desk'));
        expect(onUpdate).toBeCalledTimes(1);
        expect(recvItem.type).toBe('2');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        expect(oldItem.product).toBe('Desk');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() w/keyboard', async () => {
        let recvItem: REL.Row = {};
        let oldItem: REL.Row = {};
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): void => {
            recvItem = item;
            oldItem = old;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[1], {target: {value: '102'}});
        fireEvent.keyDown(inputs[1], {key: 'Enter', keyCode: 13, code: 13, charCode: 13});

        await waitFor(() => expect(recvItem.product).toBe('Desk'));
        expect(onUpdate).toBeCalledTimes(1);
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(102);
        expect(recvItem.stock).toBe(20);
        expect(oldItem.product).toBe('Desk');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() cancel', async () => {
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): void => undefined);
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[2], {target: {value: '102'}});
        fireEvent(await r.getAllByText('x')[0], new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));

        expect(onUpdate).toBeCalledTimes(0);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onUpdate() cancel w/keyboard', async () => {
        const onUpdate = jest.fn((item: REL.Row, old: REL.Row): void => undefined);
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onUpdate={onUpdate} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'new Desk'}});
        fireEvent.keyDown(inputs[0], {key: 'Escape', keyCode: 27, code: 27, charCode: 27});
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));

        expect(onUpdate).toBeCalledTimes(0);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('disableUpdate', async () => {
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} disableUpdate={true} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });
});
