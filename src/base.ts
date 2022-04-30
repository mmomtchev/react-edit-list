import React from 'react';

export type Element = 'id' | 'string' | 'number' | {name: string; value: string}[];

export type Schema = {name: string; type: Element}[];
export type Formatter = (props: {value: Value; opts: unknown}) => JSX.Element;
export type Editor = (props: {
    value: Value;
    opts?: unknown;
    className?: string;
    onChange: (value: Value) => void;
}) => JSX.Element;
export type Value = number | string | null | undefined;
export type Row = Record<string, Value>;

export interface Props {
    /**
     * The schema for the data
     */
    schema: Schema;

    /**
     * An asynchronous function that will be called to load the data
     */
    getData: () => Promise<Row[]>;

    /**
     * Custom formatters
     */
    format?: Record<string, Formatter>;

    /**
     * Custom editors
     */
    edit?: Record<string, Editor>;

    /**
     * Custom headers, set to `null` to completely disable headers
     */
    headers?: Record<string, JSX.Element>;

    /**
     * Called on every change with all the elements
     *
     * Return `false` to deny the operation
     */
    onChange?: (data: Row[]) => false | void | Promise<false | void>;

    /**
     * Called after insertion of a new element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onInsert?: (item: Row) => false | void | Row | Promise<false | void | Row>;

    /**
     * Called after updating an existing element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onUpdate?: (updated: Row, old: Row) => false | void | Row | Promise<false | void | Row>;

    /**
     * Called after deleting an element
     *
     * Return `false` to deny the operation
     */
    onDelete?: (item: Row) => false | void | Promise<false | void>;

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
     */
    disableUpdate?: boolean;

    /**
     * Disable deleting
     */
    disableDelete?: boolean;

    /**
     * Disable inserting
     */
    disableInsert?: boolean;
}
