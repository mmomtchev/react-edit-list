import React from 'react';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';

import ReactEditList, * as REL from 'react-edit-list';

import {schema, data, onLoad} from './data';

describe('base', () => {
    it('basic use', async () => {
        const onLoadFn = jest.fn(onLoad);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText('Desk')));
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
        await waitFor(() => expect(r.getByText('Desk')));
        expect(onLoadFn).toBeCalledTimes(2);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('single custom classes', async () => {
        const onLoadFn = jest.fn(onLoad);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText('Desk')));
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
        await waitFor(() => expect(r.getByText('Desk')));
        expect(onLoadFn).toBeCalledTimes(2);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('sync loader', async () => {
        const onLoadFn = jest.fn(() => data);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText('Desk')));
        expect(onLoadFn).toBeCalledTimes(1);
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('no headers', async () => {
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} headers={null} />);
        await waitFor(() => expect(r.getByText('Desk')));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('custom button elements', async () => {
        const r = render(
            <ReactEditList
                schema={schema}
                onLoad={onLoad}
                btnValidateElement={<button className='btn btn-primary'>YES!</button>}
                btnCancelElement={<button className='ms-2 btn btn-secondary'>NEVER</button>}
                btnDeleteElement={<button className='btn btn-danger'>REMOVE</button>}
                filler={<React.Fragment>...</React.Fragment>}
            />
        );
        await waitFor(() => expect(r.getByText('Desk')));
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent((await r.findAllByText('...'))[0], new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(await r.findByText('YES!'), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('custom grid elements', async () => {
        const r = render(
            <ReactEditList
                schema={schema}
                onLoad={onLoad}
                headClassName='container-fluid bg-dark text-light'
                bodyClassName='container-fluid bg-light'
                inputClassName='w-100'
                thClassName={{
                    product: 'col-lg-4 col-8 p-1',
                    type: 'col-lg-3 col-4 p-1',
                    price: 'col-lg-2 col-5 p-1',
                    stock: 'col-lg-2 col-5 p-1',
                    buttons: 'col-lg-1 col-2 p-1'
                }}
                tdClassName={{
                    product: 'col-lg-4 col-8 p-1',
                    type: 'col-lg-3 col-4 p-1',
                    price: 'col-lg-2 col-5 p-1',
                    stock: 'col-lg-2 col-5 p-1',
                    buttons: 'col-lg-1 col-2 p-1'
                }}
                trClassName='row'
                tableElement='div'
                tbodyElement='div'
                theadElement='div'
                trElement='div'
                tdElement='div'
                thElement='div'
                rowClassName='regular-row'
                insertClassName='insert-row'
                btnValidateClassName='btn border p-0 m-0'
                btnDeleteClassName='btn border px-1 m-0 mx-1'
                btnCancelClassName='btn border px-1 m-0 mx-1'
            />
        );
        await waitFor(() => expect(r.getByText('Desk')));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('reference forwarding', async () => {
        const onLoadFn = jest.fn(onLoad);
        const ref = React.createRef<HTMLElement>();
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} ref={ref} />);
        await waitFor(() => expect(r.getByText('Desk')));
        expect(onLoadFn).toBeCalledTimes(1);
        expect(r.container.innerHTML).toMatchSnapshot();
        expect(ref.current?.tagName.toLowerCase()).toBe('table');
        ref.current?.dispatchEvent(
            new KeyboardEvent('keydown', {key: 'R', altKey: true, bubbles: true})
        );
        await waitFor(() => expect(onLoadFn).toBeCalledTimes(2));
        r.unmount();
    });

    it('externally triggered refresh', async () => {
        const onLoadFn = jest.fn(onLoad);
        const r = render(<ReactEditList schema={schema} onLoad={onLoadFn} />);
        await waitFor(() => expect(r.getByText('Desk')));
        expect(r.container.innerHTML).toMatchSnapshot();
        expect(onLoadFn).toBeCalledTimes(1);
        await fireEvent.keyDown(r.container.querySelector('table')!, {
            key: 'R',
            altKey: true
        });
        expect(onLoadFn).toBeCalledTimes(2);
        await waitFor(() => expect(r.getByText('Desk')));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    describe('errors', () => {
        let err;
        beforeEach(() => {
            // eslint-disable-next-line no-console
            err = console.error;
            // eslint-disable-next-line no-console
            console.error = () => undefined;
        });
        afterEach(() => {
            // eslint-disable-next-line no-console
            console.error = err;
        });

        it('no schema', () => {
            expect(() =>
                render(
                    <ReactEditList schema={undefined as unknown as REL.Schema} onLoad={onLoad} />
                )
            ).toThrowError('schema prop is missing');
        });

        it('no onLoad', () => {
            expect(() => {
                render(<ReactEditList schema={schema} onLoad={undefined as unknown as () => []} />);
            }).toThrowError('onLoad callback is missing');
        });

        it('custom type w/o formatter', async () => {
            expect(() => {
                const customSchema = [...schema];
                const field = customSchema.findIndex((e) => e.name === 'product');
                customSchema[field] = {...customSchema[field]};
                customSchema[field].type = 'custom';
                const r = render(<ReactEditList schema={customSchema} onLoad={onLoad} />);
            }).toThrowError('Field product:custom has no formatter defined');
        });
    });
});
