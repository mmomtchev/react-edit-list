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

describe('onChange()', () => {
    it('onChange() on update', async () => {
        let recvItems: REL.Row[] = [];
        const onChange = jest.fn((items: REL.Row[]): void => {
            recvItems = items;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onChange={onChange} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getByText(/Desk/), new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'new Desk'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));
        expect(onChange).toBeCalledTimes(1);

        await waitFor(() => expect(recvItems).toHaveLength(6));
        expect(recvItems[0].product).toBe('new Desk');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onChange() on insert', async () => {
        let recvItems: REL.Row[] = [];
        const onChange = jest.fn((items: REL.Row[]): void => {
            recvItems = items;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onChange={onChange} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        const cells = r.container.querySelectorAll('td');
        fireEvent(cells[cells.length - 5], new MouseEvent('click', {bubbles: true}));
        await waitFor(() => expect(r.container.querySelectorAll('input').length).toBe(3));
        expect(r.container.innerHTML).toMatchSnapshot();

        const inputs = r.container.querySelectorAll('input');
        fireEvent.change(inputs[0], {target: {value: 'test item onInsert'}});
        fireEvent(await r.findByText('✓'), new MouseEvent('click', {bubbles: true}));
        expect(onChange).toBeCalledTimes(1);

        await waitFor(() => expect(recvItems).toHaveLength(7));
        expect(recvItems[6].product).toBe('test item onInsert');
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });

    it('onChange() on delete', async () => {
        let recvItems: REL.Row[] = [];
        const onChange = jest.fn((items: REL.Row[]): void => {
            recvItems = items;
        });
        const r = render(<ReactEditList schema={schema} onLoad={onLoad} onChange={onChange} />);
        await waitFor(() => expect(r.getByText(/Desk/)).toBeInTheDocument());
        expect(r.container.innerHTML).toMatchSnapshot();

        fireEvent(r.getAllByText(/^x$/)[0], new MouseEvent('click', {bubbles: true}));
        await waitForElementToBeRemoved(() => r.getByText('Desk'));
        expect(r.container.innerHTML).toMatchSnapshot();

        await waitFor(() => expect(recvItems).toHaveLength(5));
        await waitFor(() => expect(r.container.querySelectorAll('input')).toHaveLength(0));
        expect(r.container.innerHTML).toMatchSnapshot();
        r.unmount();
    });
});
