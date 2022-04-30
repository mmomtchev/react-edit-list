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

function DefaultEditNumber(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback((e) => props.onChange(+e.target.value), [props]);
    return (
        <input className={props.className} value={props.value} type='number' onChange={onChange} />
    );
}

function DefaultEditString(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback((e) => props.onChange(e.target.value), [props]);
    return (
        <input className={props.className} value={props.value} type='text' onChange={onChange} />
    );
}

function DefaultEditEnum(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback((e) => props.onChange(e.target.value), [props]);
    return (
        <select className={props.className} value={props.value ?? ''} onChange={onChange}>
            <option disabled value=''></option>
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
    onChange: (modified: Row) => Promise<false | void>;
    onDelete?: () => void;
    btnValidateClassName?: string;
    btnDeleteClassName?: string;
    btnCancelClassName?: string;
    inputClassName?: string;
    btnValidateElement?: JSX.Element;
    btnDeleteElement?: JSX.Element;
    btnCancelElement?: JSX.Element;
    disableUpdate?: boolean;
    disableDelete?: boolean;
    trClassName?: string;
    tdClassName?: string | Record<string, string>;
}): JSX.Element {
    const [edit, setEdit] = React.useState<Row | null>(null);

    const onDelete = React.useCallback(() => props.onDelete(), [props]);
    const deleteButton =
        !props.disableDelete && props.onDelete !== undefined && edit === null ? (
            props.btnDeleteElement ? (
                <div onClick={onDelete} className={props.btnDeleteClassName}>
                    {props.btnDeleteElement}
                </div>
            ) : (
                <button className={props.btnDeleteClassName} onClick={onDelete}>
                    x
                </button>
            )
        ) : null;

    const onChange = React.useCallback(() => {
        props.onChange(edit).then((r) => {
            if (r !== false) setEdit(null);
        });
    }, [props, edit, setEdit]);
    const validateButton =
        edit !== null ? (
            props.btnValidateElement ? (
                <div onClick={onChange} className={props.btnValidateClassName}>
                    {props.btnValidateElement}
                </div>
            ) : (
                <button className={props.btnValidateClassName} onClick={onChange}>
                    &#10003;
                </button>
            )
        ) : null;

    const onCancel = React.useCallback(() => setEdit(null), [setEdit]);
    const cancelButton =
        edit !== null ? (
            props.btnCancelElement ? (
                <div onClick={onCancel} className={props.btnCancelClassName}>
                    {props.btnCancelElement}
                </div>
            ) : (
                <button className={props.btnCancelClassName} onClick={onCancel}>
                    x
                </button>
            )
        ) : null;

    const onKeyDown = React.useCallback(
        (event) => {
            if (event.keyCode == 13) {
                onChange();
            }
            if (event.keyCode == 27) {
                onCancel();
            }
        },
        [onChange, onCancel]
    );

    const filler =
        props.item === undefined && edit === null ? (
            <React.Fragment>&nbsp;</React.Fragment>
        ) : undefined;

    return (
        <tr className={props.trClassName} onKeyDown={edit !== null ? onKeyDown : null}>
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
                if (edit !== null) {
                    const onChange = (v: Value) => {
                        edit[k] = v;
                        setEdit({...edit});
                    };
                    const comp = React.createElement(e, {
                        value: edit?.[k] ?? '',
                        opts: props.schema[k],
                        className: props.inputClassName,
                        onChange
                    });

                    return (
                        <td className={props.tdClassName?.[k] ?? props.tdClassName} key={k}>
                            {comp}
                        </td>
                    );
                }
                return (
                    <td
                        className={props.tdClassName?.[k] ?? props.tdClassName}
                        onClick={props.disableUpdate ? undefined : () => setEdit({...props.item})}
                        key={k}
                    >
                        {f({value: props?.item?.[k], opts: props.schema[k]})}
                    </td>
                );
            })}
            <td className={props.tdClassName?.['buttons'] ?? props.tdClassName}>
                {validateButton}
                {cancelButton}
                {deleteButton}
                {filler}
            </td>
        </tr>
    );
}
