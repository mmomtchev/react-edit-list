import * as React from 'react';

import {Schema, Props, Row, Value} from './base';
import Item from './Item';

export default function ReactEditList(props: Props): JSX.Element {
    const [data, setData] = React.useState<Row[]>([]);

    React.useEffect(() => {
        props.onLoad().then((data) => setData(data));
    }, [props]);

    return (
        <table className={props.className}>
            {props.headers !== null ? (
                <thead className={props.headClassName}>
                    <tr className={props.trClassName}>
                        {props.schema.map((col, i) => {
                            if (col.type === 'id') return null;
                            const className = props.thClassName?.[col.name] || props.thClassName;
                            if (props.headers?.[col.name])
                                return (
                                    <th className={className} key={i}>
                                        {props.headers[col.name]}
                                    </th>
                                );
                            return (
                                <th className={className} key={i}>
                                    {col.name}
                                </th>
                            );
                        })}
                        <th className={props.thClassName?.['buttons'] || props.thClassName}></th>
                    </tr>
                </thead>
            ) : null}
            <tbody className={props.bodyClassName}>
                {data.map((item, i) => (
                    <Item
                        key={i}
                        schema={props.schema}
                        format={props.format}
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
                        onChange={async (modified: Row) => {
                            if (props.onUpdate) {
                                const update = await props.onUpdate(modified, item);
                                if (update === false) return false;
                                if (typeof update === 'object') modified = update;
                            }
                            const modifiedData = [...data];
                            modifiedData[modifiedData.findIndex((x) => x === item)] = modified;
                            if (props.onChange) {
                                if ((await props.onChange(modifiedData)) === false) return false;
                            }
                            setData([...modifiedData]);
                        }}
                        onDelete={async () => {
                            if (props.onDelete) {
                                if ((await props.onDelete(item)) === false) return;
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
                    onChange={async (modified: Row) => {
                        if (props.onInsert) {
                            const update = await props.onInsert(modified);
                            if (update === false) return false;
                            if (typeof update === 'object') modified = update;
                        }
                        if (props.onChange) {
                            const modifiedData = [...data];
                            modifiedData.push(modified);
                            if ((await props.onChange(modifiedData)) === false) return false;
                        }
                        data.push(modified);
                        setData([...data]);
                    }}
                />
            </tbody>
        </table>
    );
}
