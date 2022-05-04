import * as React from 'react';

import {Schema, Props, Row, Value} from './base';
import Item from './Item';

/**
 * An universal editable list for React
 *
 * @param props {Props}
 * @returns {JSX.Element}
 */
const ReactEditList = React.forwardRef(function ReactEditList(
    props: Props,
    ref: React.Ref<HTMLElement>
): JSX.Element {
    if (!props.schema) throw new Error('schema prop is missing');
    if (!props.onLoad) throw new Error('onLoad callback is missing');

    const [data, setData] = React.useState<Row[]>([]);

    const onLoad = React.useCallback(() => {
        const dataq = props.onLoad();

        if (dataq instanceof Promise) dataq.then((data) => setData(data));
        else setData(dataq);
    }, [props, setData]);

    React.useEffect(onLoad, [onLoad]);
    const onKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.altKey && event.key == 'R') {
                onLoad();
                event.stopPropagation();
            }
        },
        [onLoad]
    );

    const sharedProps = {
        schema: props.schema,
        format: props.format,
        btnValidateClassName: props.btnValidateClassName,
        btnDeleteClassName: props.btnDeleteClassName,
        btnValidateElement: props.btnValidateElement,
        btnDeleteElement: props.btnDeleteElement,
        btnCancelClassName: props.btnCancelClassName,
        btnCancelElement: props.btnCancelElement,
        inputClassName: props.inputClassName,
        trClassName: props.trClassName,
        tdClassName: props.tdClassName,
        trElement: props.trElement,
        tdElement: props.tdElement,
        edit: props.edit,
        editProps: props.editProps,
        disableDelete: props.disableDelete,
        disableUpdate: props.disableUpdate
    };

    return React.createElement(
        props.tableElement ?? 'table',
        {
            className: props.className,
            ref,
            onKeyDown
        },
        [
            props.headers !== null
                ? React.createElement(
                      props.theadElement ?? 'thead',
                      {key: 'thead', className: props.headClassName},
                      React.createElement(
                          props.trElement ?? 'tr',
                          {className: props.trClassName},
                          ...props.schema.map((col, i) => {
                              if (col.type === 'id') return null;
                              const className = props.thClassName?.[col.name] || props.thClassName;
                              if (props.headers?.[col.name])
                                  return React.createElement(
                                      props.thElement ?? 'th',
                                      {key: i, className},
                                      props.headers[col.name]
                                  );
                              return React.createElement(
                                  props.thElement ?? 'th',
                                  {key: i, className},
                                  col.name
                              );
                          }),
                          React.createElement(props.thElement ?? 'th', {
                              key: 'buttons',
                              className: props.thClassName?.['buttons'] || props.thClassName
                          })
                      )
                  )
                : null,
            React.createElement(
                props.tbodyElement ?? 'tbody',
                {key: 'tbody', className: props.bodyClassName},
                ...data.map((item, i) => (
                    <Item
                        key={i}
                        item={item}
                        {...sharedProps}
                        onChange={async (modified: Row) => {
                            if (props.onUpdate) {
                                const update = await props.onUpdate(modified, item);
                                if (update === false) return false;
                                if (typeof update === 'object') modified = update;
                            }
                            const modifiedData = [...data];
                            modifiedData[modifiedData.findIndex((x) => x === item)] = modified;
                            if (props.onChange) {
                                const update = await props.onChange(modifiedData);
                                if (update === false) return false;
                                if (update === true) return onLoad();
                            }
                            setData([...modifiedData]);
                        }}
                        onDelete={async () => {
                            if (props.onDelete) {
                                if ((await props.onDelete(item)) === false) return;
                            }
                            const idx = data.findIndex((x) => x === item);
                            const modifiedData = [...data];
                            modifiedData.splice(idx, 1);
                            if (props.onChange) {
                                const update = await props.onChange(modifiedData);
                                if (update === false) return false;
                                if (update === true) return onLoad();
                            }
                            setData([...modifiedData]);
                        }}
                    />
                )),
                props.disableInsert ? null : (
                    <Item
                        {...sharedProps}
                        defaultValues={props.defaultValues}
                        filler={props.filler}
                        onChange={async (modified: Row) => {
                            if (props.onInsert) {
                                const update = await props.onInsert(modified);
                                if (update === false) return false;
                                if (typeof update === 'object') modified = update;
                            }
                            if (props.onChange) {
                                const modifiedData = [...data];
                                modifiedData.push(modified);
                                const update = await props.onChange(modifiedData);
                                if (update === false) return false;
                                if (update === true) return onLoad();
                            }
                            data.push(modified);
                            setData([...data]);
                        }}
                    />
                )
            )
        ]
    );
});

export default ReactEditList;
