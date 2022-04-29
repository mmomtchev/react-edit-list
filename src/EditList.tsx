import * as React from 'react';

import {Schema, Props, Row, Value, getKey} from './base';
import Item from './Item';

export default function ReactEditList(props: Props): JSX.Element {
    const [data, setData] = React.useState<Row[]>([]);

    React.useEffect(() => {
        props.getData().then((data) => setData(data));
    }, [props]);

    const idField = Object.keys(props.schema).find((k) => props.schema[k] == 'id');

    return (
        <table className={props.className}>
            {props.headers !== null ? (
                <thead className={props.headClassName}>
                    <tr>
                        {Object.keys(props.schema).map((k) => {
                            if (props.schema[k] === 'id') return null;
                            if (props.headers?.[k]) return <th key={k}>{props.headers[k]}</th>;
                            return <th key={k}>{k}</th>;
                        })}
                        <th></th>
                    </tr>
                </thead>
            ) : null}
            <tbody>
                {data.map((item) => (
                    <Item
                        key={getKey(idField, item)}
                        schema={props.schema}
                        format={props.format}
                        idField={idField}
                        item={item}
                        btnValidateClassName={props.btnValidateClassName}
                        btnDeleteClassName={props.btnDeleteClassName}
                        btnValidateElement={props.btnValidateElement}
                        btnDeleteElement={props.btnDeleteElement}
                        onChange={(field: string, value: Value) => {
                            let modified = {...item};
                            modified[field] = value;
                            if (props.onUpdate) {
                                const update = props.onUpdate(modified, item);
                                if (update === false) return;
                                if (typeof update === 'object') modified = update;
                            }
                            if (props.onChange) {
                                const modifiedData = [...data];
                                modifiedData[modifiedData.findIndex((x) => x === item)] = modified;
                                if (props.onChange(modifiedData) === false) return;
                            }
                            item[field] = value;
                            setData([...data]);
                        }}
                        onDelete={() => {
                            if (props.onDelete) {
                                if (props.onDelete(item) === false) return;
                            }
                            const idx = data.findIndex((x) => x === item);
                            data.splice(idx, 1);
                            setData([...data]);
                        }}
                    />
                ))}
                <Item
                    schema={props.schema}
                    format={props.format}
                    idField={idField}
                    btnValidateClassName={props.btnValidateClassName}
                    btnDeleteClassName={props.btnDeleteClassName}
                    btnValidateElement={props.btnValidateElement}
                    btnDeleteElement={props.btnDeleteElement}
                    onChange={(field: string, value: Value) => {
                        let item = {};
                        item[field] = value;
                        if (props.onInsert) {
                            const update = props.onInsert(item);
                            if (update === false) return;
                            if (typeof update === 'object') item = update;
                        }
                        if (props.onChange) {
                            const modifiedData = [...data];
                            modifiedData.push(item);
                            if (props.onChange(modifiedData) === false) return;
                        }
                        data.push(item);
                        setData([...data]);
                    }}
                />
            </tbody>
        </table>
    );
}
