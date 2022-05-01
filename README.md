# react-edit-list

[![License: ISC](https://img.shields.io/github/license/mmomtchev/react-edit-list)](https://github.com/mmomtchev/react-edit-list/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-edit-list)](https://www.npmjs.com/package/react-edit-list)
[![Node.js CI](https://github.com/mmomtchev/react-edit-list/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/react-edit-list/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/react-edit-list/branch/master/graph/badge.svg)](https://codecov.io/gh/mmomtchev/react-edit-list)

Universal Editable List React Component

`react-edit-list` allows for easy creation of editable lists in React that can be interfaced with a database

# Installation

Still not published

# Usage

![screenshot](https://raw.githubusercontent.com/mmomtchev/react-edit-list/main/screen-animation.gif)

```tsx
import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

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

const getData = () => Promise.resolve(data);

export default function Simple() {
    return (
        <ReactEditList
            schema={schema}
            getData={getData}
            onUpdate={(item) => {
                if (item.price > 2000) {
                    alert('Price is limited to 2000€');
                    return false;
                }
                // Call your API here
                console.log('UPDATE', item);
            }}
            onDelete={(item) => {
                if (!confirm('Are you sure you want to delete it?')) return false;
                // Call your API here
                console.log('DELETE', item);
            }}
            onInsert={(item) => {
                if (item.product === undefined || item.price === undefined) {
                    alert('Product and price are mandatory');
                    return false;
                }
                // Call your API here
                console.log('INSERT', item);
                return {...item, id: Math.round(Math.random() * 1e6)};
            }}
            format={{
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
}
```
