import React from 'react';

/**
 * Field type
 *
 * `id` means a hidden field that will be carried on by react-edit-list without any processing
 *
 * `string` and `number` have default rendering and input components
 *
 * `custom` allows you to define your own rendering and input components
 *
 * Passing an array of `name`/`value` pairs allows defining of an enum field
 */
export type Element =
    | 'id'
    | 'string'
    | 'number'
    | {name: string; value: string | undefined}[]
    | 'custom';

export type Value = unknown;

/**
 * Schema for the data
 */
export type Schema = {name: string; type: Element}[];
export type Formatter = React.FunctionComponent<{value: Value; opts: unknown}>;
export type Editor = React.FunctionComponent<{
    value: Value;
    opts?: unknown;
    className?: string;
    editProps?: Record<string, unknown>;
    onChange: (value: Value) => void;
}>;

/**
 * A row of data
 */
export type Row = Record<string, Value>;

/**
 * ReactEditList properties
 */
export interface Props {
    /**
     * The schema for the data
     */
    schema: Schema;

    /**
     * Will be called to load the data, can be asynchronous
     */
    onLoad: () => Row[] | Promise<Row[]>;

    /**
     * Custom field formatters
     *
     * Each field formatter must be a React component
     *
     * It will receive the value to be rendered in `props.value`
     *
     * @example
     * function DefaultFormatString(props: {value: Value}): JSX.Element {
     *   return <React.Fragment>{props.value as string}</React.Fragment>;
     * }
     */
    format?: Record<string, Formatter>;

    /**
     * Custom field editors
     *
     * Each field editor must be a React component
     *
     * It will receive the previous value in `props.value` and
     * should call `props.onChange` to update it
     *
     * @example
     * function DefaultEditString(props: {
     *   value: Value;
     *   opts?: unknown;
     *   className?: string;
     *   editProps?: Record<string, unknown>;
     *   onChange: (v: Value) => void;
     * }) {
     *   const onChange = React.useCallback(
     *     (e) => props.onChange(e.target.value != '' ? e.target.value : undefined),
     *     [props]
     *   );
     *   return (
     *     <input
     *       className={props.className}
     *       {...props.editProps}
     *       value={props.value as string}
     *       type='text'
     *       onChange={onChange}
     *     />
     *   );
     * }
     */
    edit?: Record<string, Editor>;

    /**
     * Custom props to be passed to the field editors
     */
    editProps?: Record<string, Record<string, unknown>>;

    /**
     * Custom headers, set to `null` to completely disable headers
     */
    headers?: Record<string, JSX.Element> | null;

    /**
     * Called on every change with all the elements
     *
     * Return `false` to deny the operation
     *
     * Return `true` to trigger a refresh through `onLoad`
     *
     * Return `undefined` for default behavior
     */
    onChange?: (data: Row[]) => boolean | void | Promise<boolean | void>;

    /**
     * Called after insertion of a new element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onInsert?: (item: Row) => boolean | void | Row | Promise<boolean | void | Row>;

    /**
     * Called after updating an existing element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onUpdate?: (updated: Row, old: Row) => boolean | void | Row | Promise<boolean | void | Row>;

    /**
     * Called after deleting an element
     *
     * Return `false` to deny the operation
     */
    onDelete?: (item: Row) => boolean | void | Promise<boolean | void>;

    /**
     * Optional default values for new elements
     */
    defaultValues?: Row;

    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Optional validate button class name
     */
    btnValidateClassName?: string;

    /**
     * Optional delete button class name
     */
    btnDeleteClassName?: string;

    /**
     * Optional cancel button class name
     */
    btnCancelClassName?: string;

    /**
     * Optional table head class name
     */
    headClassName?: string;

    /**
     * Optional table body class name
     */
    bodyClassName?: string;

    /**
     * Optional table TR class name
     */
    trClassName?: string;

    /**
     * Optional table TH class name
     */
    thClassName?: string | Record<string, string>;

    /**
     * Optional table TD class name
     */
    tdClassName?: string | Record<string, string>;

    /**
     * Optional table INPUT class name
     */
    inputClassName?: string;

    /**
     * Optional custom button element
     */
    btnValidateElement?: JSX.Element;

    /**
     * Optional custom button element
     */
    btnDeleteElement?: JSX.Element;

    /**
     * Optional custom button element
     */
    btnCancelElement?: JSX.Element;

    /**
     * Disable updating
     * @default false
     */
    disableUpdate?: boolean;

    /**
     * Disable deleting
     * @default false
     */
    disableDelete?: boolean;

    /**
     * Disable inserting
     * @default false
     */
    disableInsert?: boolean;

    /**
     * Element to use instead of <table>
     * @default 'table'
     */
    tableElement?: string;

    /**
     * Element to use instead of <tbody>
     * @default 'tbody'
     */
    tbodyElement?: string | React.FunctionComponent<{className?: string}>;

    /**
     * Element to use instead of <thead>
     * @default 'thead'
     */
    theadElement?: string | React.FunctionComponent<{className?: string}>;

    /**
     * Element to use instead of <th>
     * @default 'th'
     */
    thElement?: string | React.FunctionComponent<{className?: string}>;

    /**
     * Element to use instead of <tr>
     * @default 'tr'
     */
    trElement?: string | React.FunctionComponent<{className?: string}>;

    /**
     * Element to use instead of <td>
     *
     * Element must accept mouse and keyboard input
     *
     * @default 'td'
     */
    tdElement?:
        | string
        | React.FunctionComponent<{
              className?: string;
              onClick?: (e: React.MouseEvent) => void;
              onKeyDown?: (e: React.KeyboardEvent) => void;
          }>;

    /**
     * Element to use for the empty row that allows adding a new item
     *
     * @default '<React.Fragment>&nbsp;</React.Fragment>'
     */
    filler?: JSX.Element;
}
