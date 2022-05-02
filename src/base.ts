export type Element =
    | 'id'
    | 'string'
    | 'number'
    | {name: string; value: string | undefined}[]
    | 'custom';

export type Value = unknown;
export type Schema = {name: string; type: Element}[];
export type Formatter = (props: {value: Value; opts: unknown}) => JSX.Element;
export type Editor = (props: {
    value: Value;
    opts?: unknown;
    className?: string;
    editProps?: Record<string, unknown>;
    onChange: (value: Value) => void;
}) => JSX.Element;
export type Row = Record<string, Value>;

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
     */
    format?: Record<string, Formatter>;

    /**
     * Custom field editors
     */
    edit?: Record<string, Editor>;

    /**
     * Custom props to be passed to the field editors
     */
    editProps?: Record<string, Record<string, unknown>>;

    /**
     * Custom headers, set to `null` to completely disable headers
     */
    headers?: Record<string, JSX.Element>;

    /**
     * Called on every change with all the elements
     *
     * Return `boolean` to deny the operation
     */
    onChange?: (data: Row[]) => boolean | void | Promise<boolean | void>;

    /**
     * Called after insertion of a new element
     *
     * Return `boolean` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onInsert?: (item: Row) => boolean | void | Row | Promise<boolean | void | Row>;

    /**
     * Called after updating an existing element
     *
     * Return `boolean` to deny the operation
     *
     * Return a new item to modify its contents
     */
    onUpdate?: (updated: Row, old: Row) => boolean | void | Row | Promise<boolean | void | Row>;

    /**
     * Called after deleting an element
     *
     * Return `boolean` to deny the operation
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
