# react-edit-list

[![License: ISC](https://img.shields.io/github/license/mmomtchev/react-edit-list)](https://github.com/mmomtchev/react-edit-list/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/react-edit-list)](https://www.npmjs.com/package/react-edit-list)
[![Node.js CI](https://github.com/mmomtchev/react-edit-list/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/react-edit-list/actions?query=workflow%3A%22Node.js+CI%22)
[![codecov](https://codecov.io/gh/mmomtchev/react-edit-list/branch/main/graph/badge.svg?token=ZHVvNADJrZ)](https://codecov.io/gh/mmomtchev/react-edit-list)

Universal Editable List React Component

`react-edit-list` allows for easy creation of editable lists in React that can be interfaced with a database

-   Fully customizable
-   Zero-dependency
-   Supports async callbacks for calling externals APIs
-   Supports input validation
-   Supports optional `null` fields
-   Supports custom field types

# Installation

Still not published

# Usage

Refer to the [examples](https://mmomtchev.github.io/react-edit-list/)

![screenshot](https://raw.githubusercontent.com/mmomtchev/react-edit-list/main/screen-animation.gif)

```tsx
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
    {id: 6, product: 'Rent', type: null, price: 2000, stock: undefined}
];

// This is the schema
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

export default function Simple() {
    return (
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
            className='table table-light table-fixed align-middle'
            headClassName='table-dark'
            inputClassName='w-100'
            thClassName={{
                // These allow to fix the column widths
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
