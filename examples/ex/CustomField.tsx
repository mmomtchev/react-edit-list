import * as React from 'react';
import ReactEditList, * as REL from 'react-edit-list';

import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../example.css';

import {DayPicker as ReactDayPicker} from 'react-day-picker';
import {format, isValid} from 'date-fns';
import 'react-day-picker/dist/style.css';

const data = [
    {name: 'Ronald', birthdate: new Date('1980-01-30').getTime()},
    {name: 'Archibald', birthdate: new Date('1982-02-28').getTime()}
];
const schema: REL.Schema = [
    {name: 'name', type: 'string'},
    {name: 'birthdate', type: 'number'}
];

// Loading can be asynchronous
const getData = () => Promise.resolve(data);

export default function Dates() {
    const validate = (item) => isValid(item.birthdate);
    const display = (value) => (isValid(value) ? format(new Date(value), 'PP') : '');

    return (
        <ReactEditList
            schema={schema}
            onLoad={getData}
            onInsert={validate}
            onUpdate={validate}
            format={{
                // You have to provide a custom React component for rendering the field
                birthdate: (props) => <React.Fragment>{display(props.value)}</React.Fragment>
            }}
            edit={{
                // You have to provide a custom editor that is a React component
                // react-edit-list will pass you the current value in `props.value`
                // In order to modify it, you will have to call `props.onChange()`
                birthdate: function BirthDateEditor(props) {
                    const date = React.useMemo<Date>(() => new Date(props.value), [props]);
                    const render = React.useMemo<string>(() => display(props.value), [props]);
                    const dropdown = React.useRef<HTMLDivElement>();
                    return (
                        // This is a simple Bootstrap 5 dropdown with manual control
                        <div className='w-100'>
                            {/* This is the always visible part */}
                            <input
                                value={render}
                                readOnly
                                onFocus={React.useCallback(
                                    // On focus, show the dropdown
                                    () => dropdown.current.classList.add('show'),
                                    [dropdown]
                                )}
                                className='user-select-none w-100'
                            />
                            {/* This is the dropdown part */}
                            <div className='dropdown-menu' ref={dropdown}>
                                <ReactDayPicker
                                    mode='single'
                                    selected={date}
                                    defaultMonth={date}
                                    onSelect={React.useCallback(
                                        (value) => {
                                            // Here we send the new date to react-edit-list
                                            props.onChange(new Date(value).getTime());
                                            // And then we close the dropdown
                                            dropdown.current.classList.remove('show');
                                        },
                                        [props]
                                    )}
                                />
                            </div>
                        </div>
                    );
                }
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
