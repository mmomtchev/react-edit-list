import React from 'react';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';

import ReactEditList, * as REL from 'react-edit-list';

import {schema, data, onLoad} from './data';

describe('base', () => {
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
                headers={{product: <p>product</p>}}
                thClassName={{
                    product: 'col-4',
                    type: 'col-3',
                    price: 'col-2',
                    stock: 'col-2',
                    buttons: 'col-1'
                }}
                tdClassName={{
                    product: 'product',
                    type: 'type',
                    price: 'price',
                    stock: 'stock',
                    buttons: 'buttons'
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

    it('single custom classes', async () => {
        const onLoadFn = jest.fn(onLoad);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText(/Desk/)));
        expect(onLoadFn).toBeCalledTimes(1);
        expect(r.container.innerHTML).toMatchSnapshot();

        r.rerender(
            <ReactEditList
                schema={schema}
                onLoad={onLoadFn}
                thClassName={'thClass'}
                tdClassName={'tdClass'}
                trClassName={'trClass'}
            />
        );
        await waitFor(() => expect(r.getByText(/Desk/)));
        expect(onLoadFn).toBeCalledTimes(2);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });
});
