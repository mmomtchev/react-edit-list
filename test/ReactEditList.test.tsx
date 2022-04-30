import React from 'react';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';

import ReactEditList, * as REL from 'react-edit-list';

import {schema, data, onLoad} from './data';

describe('<ReactEditList>', () => {
    it('basic use', async () => {
        const onLoadFn = jest.fn(onLoad);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText(/Desk/)));
        expect(onLoadFn).toBeCalledTimes(1);
        expect(r.container.innerHTML).toMatchSnapshot();

        r.rerender(
            <ReactEditList
                schema={schema}
                onLoad={onLoadFn}
                className='table table-light table-fixed align-middle'
                headClassName='table-dark'
                inputClassName='w-100'
                thClassName={{
                    product: 'col-4',
                    type: 'col-3',
                    price: 'col-2',
                    stock: 'col-2',
                    buttons: 'col-1'
                }}
                btnValidateClassName='btn btn-success p-0 m-0'
                btnDeleteClassName='btn btn-danger py-0 px-1 m-0 mx-1'
                btnCancelClassName='btn btn-secondary py-0 px-1 m-0 mx-1'
            />
        );
        await waitFor(() => expect(r.getByText(/Desk/)));
        expect(onLoadFn).toBeCalledTimes(2);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    describe('onInsert()', () => {
        it('onInsert() undefined', async () => {
            let recvItem: REL.Row = {};
            const onInsert = jest.fn((item: REL.Row): void => {
                recvItem = item;
            });
            const r = render(<ReactEditList schema={schema} onLoad={onLoad} onInsert={onInsert} />);
            await waitFor(() => expect(r.getByText(/Desk/)));
            expect(r.container.innerHTML).toMatchSnapshot();

            const cells = r.container.querySelectorAll('td');
            fireEvent(cells[cells.length - 5], new MouseEvent('click', {bubbles: true}));
            await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
            expect(r.container.innerHTML).toMatchSnapshot();

            const inputs = r.container.querySelectorAll('input');
            fireEvent.change(inputs[0], {target: {value: 'test item'}});
            fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));
            expect(onInsert).toBeCalledTimes(1);

            await waitFor(() => expect(recvItem.product).toBe('test item'));
            expect(recvItem.type).toBeUndefined();
            expect(recvItem.price).toBeUndefined();
            expect(recvItem.stock).toBeUndefined();
            await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
            expect(r.container.innerHTML).toMatchSnapshot();
            r.unmount();
        });

        it('onInsert() false', async () => {
            let recvItem: REL.Row = {};
            const onInsert = jest.fn((item: REL.Row): Promise<false> => {
                recvItem = item;
                return Promise.resolve(false);
            });
            const r = render(<ReactEditList schema={schema} onLoad={onLoad} onInsert={onInsert} />);
            await waitFor(() => expect(r.getByText(/Desk/)));
            expect(r.container.innerHTML).toMatchSnapshot();

            const cells = r.container.querySelectorAll('td');
            fireEvent(cells[cells.length - 5], new MouseEvent('click', {bubbles: true}));
            await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
            expect(r.container.innerHTML).toMatchSnapshot();

            const inputs = r.container.querySelectorAll('input');
            fireEvent.change(inputs[0], {target: {value: 'test item 2'}});
            fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));
            expect(onInsert).toBeCalledTimes(1);

            await waitFor(() => expect(recvItem.product).toBe('test item 2'));
            expect(recvItem.type).toBeUndefined();
            expect(recvItem.price).toBeUndefined();
            expect(recvItem.stock).toBeUndefined();
            await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(3));
            expect(r.container.innerHTML).toMatchSnapshot();
            r.unmount();
        });

        it('onInsert() false', async () => {
            let recvItem: REL.Row = {};
            const onInsert = jest.fn((item: REL.Row): Promise<REL.Row> => {
                recvItem = item;
                return Promise.resolve({product: 'something different'});
            });
            const r = render(<ReactEditList schema={schema} onLoad={onLoad} onInsert={onInsert} />);
            await waitFor(() => expect(r.getByText(/Desk/)));
            expect(r.container.innerHTML).toMatchSnapshot();

            const cells = r.container.querySelectorAll('td');
            fireEvent(cells[cells.length - 5], new MouseEvent('click', {bubbles: true}));
            await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
            expect(r.container.innerHTML).toMatchSnapshot();

            const inputs = r.container.querySelectorAll('input');
            fireEvent.change(inputs[0], {target: {value: 'test item 3'}});
            fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));
            expect(onInsert).toBeCalledTimes(1);

            await waitFor(() => expect(recvItem.product).toBe('test item 3'));
            expect(recvItem.type).toBeUndefined();
            expect(recvItem.price).toBeUndefined();
            expect(recvItem.stock).toBeUndefined();
            await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
            await waitFor(() => expect(r.getByText(/something different/)));
            expect(r.container.innerHTML).toMatchSnapshot();
            r.unmount();
        });
    });
});
