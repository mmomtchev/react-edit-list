import React from 'react';

export type element = 'id' | 'string' | 'number' | Record<string, string>;

export type Schema = Record<string, element>;
export type Formatter = (props: {value: Value; opts: unknown}) => JSX.Element;
export type Editor = (props: {value: Value; opts: unknown; onChange; onUpdate}) => JSX.Element;
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
    onChange?: (data: Row[]) => false | void;

    /**
     * Called after insertion of a new element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onInsert?: (item: Row) => false | void | Row;

    /**
     * Called after updating an existing element
     *
     * Return `false` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onUpdate?: (updated: Row, old: Row) => false | void | Row;

    /**
     * Called after deleting an element
     *
     * Return `false` to deny the operation
     */
    onDelete?: (item: Row) => boolean | void;

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
     * Optional delete button class name
     */
    headClassName?: string;

    /**
     * Optional custom button element
     */
    btnValidateElement?: JSX.Element;

    /**
     * Optional custom button element
     */
    btnDeleteElement?: JSX.Element;

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

let uid = 0;
export function getKey(idField: string, e: Record<string, unknown>): number | string {
    if (idField !== undefined) return e[idField] as number | string;

    return uid++;
}
