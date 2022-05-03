import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../example.css';

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

const data: REL.Row[] = [];
for (let i = 0; i < 10000; i++) {
    data.push({
        id: i,
        product: `Product #${i}`,
        type: Math.round(Math.random() + 1),
        price: Math.round(Math.random() * 100),
        stock: Math.round(Math.random() * 500)
    });
}

const perPage = 50;

export default function Simple() {
    const ref = React.useRef<HTMLElement>();
    const [page, setPage] = React.useState<number>(0);

    // useCallback will generate a new onLoad function
    // every time the page changes
    const onLoad = React.useCallback(
        () => data.slice(page * perPage, (page + 1) * perPage),
        [page]
    );

    const totalPages = Math.ceil(data.length / perPage);

    return (
        <div>
            {/* This is standard Bootstrap pagination */}
            <nav>
                <ul className='pagination user-select-none'>
                    {page > 0 ? (
                        <React.Fragment>
                            <li className='page-item'>
                                <a className='page-link' onClick={() => setPage(page - 1)}>
                                    Previous
                                </a>
                            </li>
                            <li className='page-item'>
                                <a className='page-link' onClick={() => setPage(page - 1)}>
                                    {page}
                                </a>
                            </li>
                        </React.Fragment>
                    ) : null}
                    <li className='page-item active'>
                        <a className='page-link active'>{page + 1}</a>
                    </li>
                    {page < totalPages - 1 ? (
                        <React.Fragment>
                            <li className='page-item'>
                                <a className='page-link' onClick={() => setPage(page + 1)}>
                                    {page + 2}
                                </a>
                            </li>
                            <li className='page-item'>
                                <a className='page-link' onClick={() => setPage(page + 1)}>
                                    Next
                                </a>
                            </li>
                        </React.Fragment>
                    ) : null}
                </ul>
            </nav>
            <ReactEditList
                ref={ref}
                schema={schema}
                // Every time this function changes, React will trigger an update
                onLoad={onLoad}
                onDelete={(item) => {
                    if (!confirm('Are you sure you want to delete it?')) return false;
                }}
                onChange={(items) => {
                    // Here you should call your API
                    data.splice(page * perPage, perPage, ...items);

                    // Force a reload
                    return true;
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
        </div>
    );
}
