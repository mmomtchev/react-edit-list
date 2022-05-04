import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

// This example uses sortablejs to implement drag&drop reordering
import Sortable from 'sortablejs';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../example.css';

// This is the example data
let data = [
    {id: 1, product: 'Desk', type: '1', price: 100, stock: 20},
    {id: 2, product: 'Printer', type: '1', price: 500, stock: 10},
    {id: 3, product: 'Paper', type: '2', price: 5, stock: 2000},
    {id: 4, product: 'Chair', type: '1', price: 50, stock: 50},
    {id: 5, product: 'Computer', type: '1', price: 1000, stock: 20}
];

// This is the schema
const schema: REL.Schema = [
    {name: 'id', type: 'id'},
    {name: 'product', type: 'string'},
    {
        name: 'type',
        type: [
            {value: '1', name: 'capex'},
            {value: '2', name: 'consumable'}
        ]
    },
    {name: 'price', type: 'number'},
    {name: 'stock', type: 'number'}
];

export default function Reordering() {
    const ref = React.useRef<HTMLElement>();
    React.useLayoutEffect(() => {
        const sortable = Sortable.create(document.getElementsByClassName('sortable-items')[0], {
            // We don't want to reorder the empty insertion row
            draggable: '.draggable',
            // You need this for toArray() to work
            dataIdAttr: 'dataid',
            onSort: () => {
                // You will need to keep a local copy of the data
                data = sortable.toArray().map((i) => data[i]);

                // Call your API here
                console.log('REORDER', data);

                // And trigger a refresh with it
                ref.current?.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'R',
                        altKey: true,
                        bubbles: true
                    })
                );
            }
        });
    });
    return (
        <React.Fragment>
            <div className='m-3 fw-bold'>You can reorder the items by dragging and dropping</div>
            <ReactEditList
                schema={schema}
                onLoad={() => data}
                ref={ref}
                onUpdate={(item) => {
                    // Call your API here
                    console.log('UPDATE', item);
                }}
                onDelete={(item) => {
                    if (!confirm('Are you sure you want to delete it?')) return false;
                    // Call your API here
                    console.log('DELETE', item);
                }}
                onInsert={(item) => {
                    // Call your API here
                    console.log('INSERT', item);
                }}
                className='table table-dark table-rounded table-fixed align-middle'
                headClassName='table-light'
                inputClassName='w-100'
                thClassName={{
                    // These allow to fix the column widths
                    product: 'col-4',
                    type: 'col-3',
                    price: 'col-2',
                    stock: 'col-2',
                    buttons: 'col-1'
                }}
                bodyClassName='sortable-items'
                btnValidateClassName='btn btn-success p-0 m-0'
                btnDeleteClassName='btn btn-danger py-0 px-1 m-0 mx-1'
                btnCancelClassName='btn btn-secondary py-0 px-1 m-0 mx-1'
                rowClassName='draggable'
                insertClassName='not-draggable'
            />
        </React.Fragment>
    );
}
