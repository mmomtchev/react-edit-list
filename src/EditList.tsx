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
                    <tr className={props.trClassName}>
                        {Object.keys(props.schema).map((k) => {
                            if (props.schema[k] === 'id') return null;
                            const className = props.thClassName?.[k] || props.thClassName;
                            if (props.headers?.[k])
                                return (
                                    <th className={className} key={k}>
                                        {props.headers[k]}
                                    </th>
                                );
                            return (
                                <th className={className} key={k}>
                                    {k}
                                </th>
                            );
                        })}
                        <th className={props.thClassName?.['buttons'] || props.thClassName}></th>
                    </tr>
                </thead>
            ) : null}
            <tbody className={props.bodyClassName}>
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
                        btnCancelClassName={props.btnCancelClassName}
                        btnCancelElement={props.btnCancelElement}
                        inputClassName={props.inputClassName}
                        trClassName={props.trClassName}
                        tdClassName={props.tdClassName}
                        onChange={(modified: Row) => {
                            if (props.onUpdate) {
                                const update = props.onUpdate(modified, item);
                                if (update === false) return false;
                                if (typeof update === 'object') modified = update;
                            }
                            const modifiedData = [...data];
                            modifiedData[modifiedData.findIndex((x) => x === item)] = modified;
                            if (props.onChange) {
                                if (props.onChange(modifiedData) === false) return false;
                            }
                            setData([...modifiedData]);
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
                    item={props.defaultValues}
                    btnValidateClassName={props.btnValidateClassName}
                    btnDeleteClassName={props.btnDeleteClassName}
                    btnValidateElement={props.btnValidateElement}
                    btnDeleteElement={props.btnDeleteElement}
                    btnCancelClassName={props.btnCancelClassName}
                    btnCancelElement={props.btnCancelElement}
                    inputClassName={props.inputClassName}
                    trClassName={props.trClassName}
                    tdClassName={props.tdClassName}
                    onChange={(modified: Row) => {
                        if (props.onInsert) {
                            const update = props.onInsert(modified);
                            if (update === false) return false;
                            if (typeof update === 'object') modified = update;
                        }
                        if (props.onChange) {
                            const modifiedData = [...data];
                            modifiedData.push(modified);
                            if (props.onChange(modifiedData) === false) return false;
                        }
                        data.push(modified);
                        setData([...data]);
                    }}
                />
            </tbody>
        </table>
    );
}
