# react-edit-list

Universal Editable List React Component

`react-edit-list` allows for easy creation of editable lists in React that can be interfaced with a database

# Installation

Still not published

# Usage

![screenshot](https://raw.githubusercontent.com/mmomtchev/react-edit-list/main/screen-animation.gif)

```tsx
import * as React from 'react';
import {Schema as ReactEditListSchema, default as ReactEditList} from 'react-edit-list';

const data = [
    {id: 1, product: 'Desk', type: '1', price: 100, stock: 20},
    {id: 2, product: 'Printer', type: '1', price: 500, stock: 10},
    {id: 3, product: 'Paper', type: '2', price: 5, stock: 2000},
    {id: 4, product: 'Chair', type: '1', price: 50, stock: 50},
    {id: 5, product: 'Computer', type: '1', price: 1000, stock: 20}
];
const schema: ReactEditListSchema = {
    id: 'id',
    product: 'string',
    type: {
        '1': 'capex',
        '2': 'consumable'
    },
    price: 'number',
    stock: 'number'
};

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
                // Call your API here
                console.log('DELETE', item);
            }}
            onInsert={(item) => {
                // Call your API here
                console.log('INSERT', item);
                return {...item, id: Math.round(Math.random() * 1e6)};
            }}
            format={{
                price: (props) => (
                    <React.Fragment>
                        {props.value !== undefined ? `${props.value} €` : '0 €'}
                    </React.Fragment>
                )
            }}
            className='table table-light'
            headClassName='table-dark '
            btnValidateClassName='btn btn-success p-0 mx-1'
            btnDeleteClassName='btn btn-danger p-1'
        />
    );
}
```