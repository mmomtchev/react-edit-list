import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../example.css';

const data = [
    {id: 1, product: 'Desk', type: '1', price: 100, stock: 20},
    {id: 2, product: 'Printer', type: '1', price: 500, stock: 10},
    {id: 3, product: 'Paper', type: '2', price: 5, stock: 2000},
    {id: 4, product: 'Chair', type: '1', price: 50, stock: 50},
    {id: 5, product: 'Computer', type: '1', price: 1000, stock: 20},
    {id: 6, product: 'Rent', type: null, price: 2000, stock: undefined}
];
const schema: REL.Schema = [
    {name: 'id', type: 'id'},
    {name: 'product', type: 'string'},
    {
        name: 'type',
        type: [
            {value: null, name: ''},
            {value: '1', name: 'capex'},
            {value: '2', name: 'consumable'}
        ]
    },
    {name: 'price', type: 'number'},
    {name: 'stock', type: 'number'}
];

// Loading can be asynchronous
const getData = () => Promise.resolve(data);

export default function Advanced() {
    return (
        <ReactEditList
            schema={schema}
            onLoad={getData}
            onUpdate={(item) => {
                // The operation can be denied
                if (item.price > 2000) {
                    alert('Price is limited to 2000€');
                    return false;
                }
                // Call your API here
                console.log('UPDATE', item);
            }}
            onDelete={(item) => {
                // The operation can be denied
                if (!confirm('Are you sure you want to delete it?')) return false;
                // Call your API here
                console.log('DELETE', item);
            }}
            onInsert={(item) => {
                // The operation can be denied
                if (item.product === undefined || item.price === undefined) {
                    alert('Product and price are mandatory');
                    return false;
                }
                // Call your API here
                console.log('INSERT', item);

                // The object can be modified before insertion
                // This is the ideal place to assign unique ids
                return Promise.resolve({...item, id: Math.round(Math.random() * 1e6)});
            }}
            format={{
                // Some fields can have a custom display element
                price: (props) => (
                    <React.Fragment>
                        {props.value !== undefined ? `${props.value} €` : undefined}
                    </React.Fragment>
                )
            }}
            onChange={(items) => {
                // Process the whole list
                console.log('DATA', items);
            }}
            // Headers are customizable
            headers={{
                price: <span>price (€)</span>
            }}
            // You can provide arbitrary props to be passed to the `input` element
            editProps={{
                price: {min: 0, max: 2000, step: 5}
            }}
            className='table table-light table-fixed align-middle'
            headClassName='table-dark'
            inputClassName='w-100'
            thClassName={{
                product: 'col-3',
                type: 'col-2',
                price: 'col-1',
                stock: 'col-1',
                // More place for the buttons
                buttons: 'col-3'
            }}
            // You can provide arbitrary elements for buttons
            btnValidateElement={<button className='btn btn-primary'>YES!</button>}
            btnCancelElement={<button className='ms-2 btn btn-secondary'>NEVER</button>}
            btnDeleteElement={<button className='btn btn-danger'>REMOVE</button>}
            // Prevent buttons from wrapping around on two lines
            // see example.css
            tdClassName={{
                buttons: 'no-wrap'
            }}
        />
    );
}
