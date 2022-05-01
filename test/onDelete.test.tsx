import React from 'react';
import {
    cleanup,
    fireEvent,
    render,
    waitFor,
    waitForElementToBeRemoved
} from '@testing-library/react';

import ReactEditList, * as REL from 'react-edit-list';

import {schema, data, onLoad} from './data';

describe('onDelete()', () => {
    it('onDelete() undefined', async () => {
        let recvItem: REL.Row = {};
        const onDelete = jest.fn((item: REL.Row): Promise<void> => {
            recvItem = item;
            return Promise.resolve(undefined);
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onDelete={onDelete} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getAllByText(/^x$/)[0], new MouseEvent('click', {bubbles: true}));
        await waitForElementToBeRemoved(() => r.queryByText('Desk'));
        expect(r.container.innerHTML).toMatchSnapshot();

        expect(onDelete).toBeCalledTimes(1);
        expect(recvItem.product).toBe('Desk');
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        r.unmount();
    });

    it('onDelete() false', async () => {
        let recvItem: REL.Row = {};
        const onDelete = jest.fn((item: REL.Row): false => {
            recvItem = item;
            return false;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onDelete={onDelete} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getAllByText(/^x$/)[0], new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(onDelete).toBeCalledTimes(1));
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        expect(recvItem.product).toBe('Desk');
        expect(recvItem.type).toBe('1');
        expect(recvItem.price).toBe(100);
        expect(recvItem.stock).toBe(20);
        r.unmount();
    });

    it('disableDelete', async () => {
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} disableDelete={true} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();
        expect(r.queryAllByText(/^x$/)).toHaveLength(0);
        r.unmount();
    });
});
