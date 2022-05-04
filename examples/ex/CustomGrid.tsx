import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../example.css';

// This is the example data
const data = [
    {id: 1, product: 'Desk', type: '1', price: 100, stock: 20},
    {id: 2, product: 'Printer', type: '1', price: 500, stock: 10},
    {id: 3, product: 'Paper', type: '2', price: 5, stock: 2000},
    {id: 4, product: 'Chair', type: '1', price: 50, stock: 50},
    {id: 5, product: 'Computer', type: '1', price: 1000, stock: 20},
    {id: 6, product: 'Rent', type: undefined, price: 2000, stock: undefined}
];

// This is the schema
const schema: REL.Schema = [
    {name: 'id', type: 'id'},
    {name: 'product', type: 'string'},
    {
        name: 'type',
        type: [
            {value: undefined, name: ''},
            {value: '1', name: 'capex'},
            {value: '2', name: 'consumable'}
        ]
    },
    {name: 'price', type: 'number'},
    {name: 'stock', type: 'number'}
];

export default function CustomGridElements() {
    return (
        <div>
            <p>
                This grid uses custom elements. It replaces the table elements with divs placed on
                Bootstrap&apos;s grid. It is a <strong>responsive</strong> design that will
                automatically switch to two lines per row when you reduce the width of your screen
                below 992px.
            </p>
            <ReactEditList
                schema={schema}
                onLoad={() => data}
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
                onChange={(items) => {
                    // Process the whole list
                    console.log('DATA', items);
                }}
                // This grid uses custom elements
                // It replaces the <table> elements with divs placed on Bootstrap's grid
                //
                // It is a responsive design that will automatically switch to two
                // lines per row when you reduce the width of your screen below 992px
                //
                className='container-fluid gx-0'
                headClassName='bg-dark text-light'
                bodyClassName='bg-light'
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
                trClassName='gx-0 row border'
                tableElement='div'
                tbodyElement='div'
                theadElement='div'
                trElement='div'
                tdElement='div'
                thElement='div'
                btnValidateClassName='btn border p-0 m-0'
                btnDeleteClassName='btn border px-1 m-0 mx-1'
                btnCancelClassName='btn border px-1 m-0 mx-1'
            />
        </div>
    );
}
