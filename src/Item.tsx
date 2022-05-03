import * as React from 'react';

import {Schema, Row, Value, Formatter, Editor} from './base';

function DefaultFormatNumber(props: {value: Value}): JSX.Element {
    if (props.value !== null && props.value !== undefined)
        return <React.Fragment>{(props.value as number).toString()}</React.Fragment>;

    return <React.Fragment></React.Fragment>;
}

function DefaultFormatString(props: {value: Value}): JSX.Element {
    return <React.Fragment>{props.value as string}</React.Fragment>;
}

function DefaultFormatEnum(props: {value: Value; opts: unknown}): JSX.Element {
    const opt = (props.opts as {name: string; value: string}[]).find((o) => o.value == props.value);
    return <React.Fragment>{opt ? opt.name : ''}</React.Fragment>;
}

function DefaultEditNumber(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    editProps?: Record<string, unknown>;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback(
        (e) => props.onChange(e.target.value != '' ? +e.target.value : undefined),
        [props]
    );
    return (
        <input
            className={props.className}
            {...props.editProps}
            value={props.value as number}
            type='number'
            onChange={onChange}
        />
    );
}

function DefaultEditString(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    editProps?: Record<string, unknown>;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback(
        (e) => props.onChange(e.target.value != '' ? e.target.value : undefined),
        [props]
    );
    return (
        <input
            className={props.className}
            {...props.editProps}
            value={props.value as string}
            type='text'
            onChange={onChange}
        />
    );
}

function DefaultEditEnum(props: {
    value: Value;
    opts?: unknown;
    className?: string;
    editProps?: Record<string, unknown>;
    onChange: (v: Value) => void;
}) {
    const onChange = React.useCallback(
        (e) => props.onChange(e.target.value != '' ? e.target.value : undefined),
        [props]
    );
    return (
        <select
            {...props.editProps}
            className={props.className}
            value={(props.value ?? '') as string}
            onChange={onChange}
        >
            {(props.opts as {name: string; value: string}[]).map((opt, i) => (
                <option key={i} value={opt.value}>
                    {opt.name}
                </option>
            ))}
        </select>
    );
}

export default function Item(props: {
    schema: Schema;
    format?: Record<string, Formatter>;
    edit?: Record<string, Editor>;
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
    trElement?: string | React.FunctionComponent<{className?: string}>;
    tdElement?:
        | string
        | React.FunctionComponent<{
              className?: string;
              onClick?: (e: React.MouseEvent) => void;
              onKeyDown?: (e: React.KeyboardEvent) => void;
          }>;
    editProps?: Record<string, Record<string, unknown>>;
}): JSX.Element {
    const [edit, setEdit] = React.useState<Row | null>(null);

    const onDelete = React.useCallback(() => props.onDelete && props.onDelete(), [props]);
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
        if (edit !== null)
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
        (event: React.KeyboardEvent) => {
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

    const tdClassName = (field) =>
        props.tdClassName?.[field] ??
        (typeof props.tdClassName === 'string' ? props.tdClassName : undefined);

    return React.createElement(
        props.trElement ?? 'tr',
        {className: props.trClassName},
        ...props.schema.map((col, i) => {
            let f: Formatter, e: Editor;
            if (col.type === 'custom') {
                f = props.format?.[col.name]!;
                e = props.edit?.[col.name]!;
            } else if (col.type === 'string') {
                f = props.format?.[col.name] || DefaultFormatString;
                e = props.edit?.[col.name] || DefaultEditString;
            } else if (col.type === 'number') {
                f = props.format?.[col.name] || DefaultFormatNumber;
                e = props.edit?.[col.name] || DefaultEditNumber;
            } else if (typeof col.type === 'object') {
                f = props.format?.[col.name] || DefaultFormatEnum;
                e = props.edit?.[col.name] || DefaultEditEnum;
            } else {
                return null;
            }

            if (edit !== null) {
                const editProps = props.editProps?.[col.name];
                const onChange = (v: Value) => {
                    edit[col.name] = v;
                    setEdit({...edit});
                };
                if (!e) throw new Error(`Field ${col.name}:${col.type} has no editor defined`);
                const comp = React.createElement(e, {
                    value: edit?.[col.name] ?? '',
                    opts: col.type,
                    className: props.inputClassName,
                    editProps: editProps,
                    onChange
                });

                return React.createElement(
                    props.tdElement ?? 'td',
                    {
                        className: tdClassName(col.name),
                        key: i,
                        onKeyDown: edit !== null ? onKeyDown : undefined
                    },
                    comp
                );
            }
            if (!f) throw new Error(`Field ${col.name}:${col.type} has no formatter defined`);
            return React.createElement(
                props.tdElement ?? 'td',
                {
                    className: tdClassName(col.name),
                    onClick: props.disableUpdate ? undefined : () => setEdit({...props.item}),
                    key: i
                },
                f({value: props?.item?.[col.name], opts: col.type})
            );
        }),
        React.createElement(
            props.tdElement ?? 'td',
            {className: tdClassName('buttons')},
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {validateButton}
                {cancelButton}
                {deleteButton}
                {filler}
            </div>
        )
    );
}
