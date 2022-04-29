import * as React from 'react';

import {Schema, Row, Value, Formatter, Editor} from './base';

function DefaultFormatNumber(props: {value: Value}): JSX.Element {
    if (props.value !== null && props.value !== undefined)
        return <React.Fragment>{props.value.toString()}</React.Fragment>;

    return null;
}

function DefaultFormatString(props: {value: Value}): JSX.Element {
    return <React.Fragment>{props.value}</React.Fragment>;
}

function DefaultFormatEnum(props: {value: Value; opts: unknown}): JSX.Element {
    return <React.Fragment>{props.opts[props.value]}</React.Fragment>;
}

function DefaultEditNumber(props: {value: Value; opts: unknown; onChange; onUpdate}) {
    const onKeyDown = React.useCallback(
        (event) => {
            if (event.keyCode == 13) {
                props.onUpdate();
            }
        },
        [props]
    );
    const onChange = React.useCallback((e) => props.onChange(+e.target.value), [props]);
    return (
        <input defaultValue={props.value} type='number' onChange={onChange} onKeyDown={onKeyDown} />
    );
}

function DefaultEditString(props: {value: Value; opts: unknown; onChange; onUpdate}) {
    const onKeyDown = React.useCallback(
        (event) => {
            if (event.keyCode == 13) {
                props.onUpdate();
            }
        },
        [props]
    );
    const onChange = React.useCallback((e) => props.onChange(e.target.value), [props]);
    return (
        <input defaultValue={props.value} type='text' onChange={onChange} onKeyDown={onKeyDown} />
    );
}

function DefaultEditEnum(props: {value: Value; opts: unknown; onChange; onUpdate}) {
    const onKeyDown = React.useCallback(
        (event) => {
            if (event.keyCode == 13) {
                props.onUpdate();
            }
        },
        [props]
    );
    const onChange = React.useCallback((e) => props.onChange(e.target.value), [props]);
    return (
        <select defaultValue={props.value} onChange={onChange} onKeyDown={onKeyDown}>
            {Object.keys(props.opts).map((k) => (
                <option key={k} value={k}>
                    {props.opts[k]}
                </option>
            ))}
        </select>
    );
}

export default function Item(props: {
    schema: Schema;
    format?: Record<string, Formatter>;
    edit?: Record<string, Editor>;
    idField?: string;
    item?: Row;
    onChange: (field: string, value: Value) => void;
    onDelete?: () => void;
    btnValidateClassName?: string;
    btnDeleteClassName?: string;
    btnValidateElement?: JSX.Element;
    btnDeleteElement?: JSX.Element;
    disableUpdate?: boolean;
    disableDelete?: boolean;
}): JSX.Element {
    const [edit, setEdit] = React.useState<string | null>(null);
    const [value, setValue] = React.useState<string | number | null>(null);

    const onChange = React.useCallback((v) => setValue(v), [setValue]);
    const onDelete = React.useCallback(() => props.onDelete(), [props]);

    const deleteButton = props.btnDeleteElement ? (
        <div onClick={onDelete}>{props.btnDeleteElement}</div>
    ) : (
        <button className={props.btnDeleteClassName} onClick={onDelete}>
            x
        </button>
    );

    return (
        <tr>
            {Object.keys(props.schema).map((k) => {
                let f: Formatter, e: Editor;
                if (props.schema[k] === 'string') {
                    f = props.format?.[k] || DefaultFormatString;
                    e = props.edit?.[k] || DefaultEditString;
                } else if (props.schema[k] === 'number') {
                    f = props.format?.[k] || DefaultFormatNumber;
                    e = props.edit?.[k] || DefaultEditNumber;
                } else if (typeof props.schema[k] === 'object') {
                    f = props.format?.[k] || DefaultFormatEnum;
                    e = props.edit?.[k] || DefaultEditEnum;
                } else {
                    return null;
                }
                if (edit == k) {
                    const onUpdate = () => {
                        props.onChange(k, value);
                        setEdit(null);
                    };
                    const comp = React.createElement(e, {
                        value: props?.item?.[k],
                        opts: props.schema[k],
                        onChange,
                        onUpdate
                    });
                    const validateButton = props.btnValidateElement ? (
                        <div onClick={onUpdate}>{props.btnValidateElement}</div>
                    ) : (
                        <button className={props.btnValidateClassName} onClick={onUpdate}>
                            &#10003;
                        </button>
                    );

                    return (
                        <td key={k}>
                            {comp}
                            {validateButton}
                        </td>
                    );
                }
                return (
                    <td
                        onClick={() => {
                            if (props.disableUpdate) return;
                            setEdit(k);
                            setValue(props?.item?.[k]);
                        }}
                        key={k}
                    >
                        {f({value: props?.item?.[k], opts: props.schema[k]})}
                    </td>
                );
            })}
            <td>{props.disableDelete || props.onDelete === undefined ? null : deleteButton}</td>
        </tr>
    );
}
