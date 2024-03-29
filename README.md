# react-edit-list

[![License: ISC](https://img.shields.io/github/license/mmomtchev/react-edit-list)](https://github.com/mmomtchev/react-edit-list/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-edit-list)](https://www.npmjs.com/package/react-edit-list) [![Node.js CI](https://github.com/mmomtchev/react-edit-list/workflows/Node.js%20CI/badge.svg)](https://github.com/mmomtchev/react-edit-list/actions?query=workflow%3A%22Node.js+CI%22) [![codecov](https://codecov.io/gh/mmomtchev/react-edit-list/branch/main/graph/badge.svg?token=ZHVvNADJrZ)](https://codecov.io/gh/mmomtchev/react-edit-list)

Universal Editable List React Component

`react-edit-list` allows for easy creation of editable lists in React that can be interfaced with a database

*   Fully customizable
*   Zero-dependency
*   Supports async callbacks for calling externals APIs
*   Supports input validation
*   Supports optional `null` fields
*   Supports custom field types

# Installation

```shell
npm i --save react-edit-layers
```

# Usage

Refer to the [examples](https://mmomtchev.github.io/react-edit-list/)

![screenshot](https://raw.githubusercontent.com/mmomtchev/react-edit-list/main/screen-animation.gif)

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Element](#element)
*   [Schema](#schema)
*   [Row](#row)
*   [Props](#props)
    *   [schema](#schema-1)
    *   [onLoad](#onload)
    *   [format](#format)
        *   [Examples](#examples)
    *   [edit](#edit)
        *   [Examples](#examples-1)
    *   [editProps](#editprops)
    *   [headers](#headers)
    *   [onChange](#onchange)
    *   [onInsert](#oninsert)
    *   [onUpdate](#onupdate)
    *   [onDelete](#ondelete)
    *   [defaultValues](#defaultvalues)
    *   [className](#classname)
    *   [btnValidateClassName](#btnvalidateclassname)
    *   [btnDeleteClassName](#btndeleteclassname)
    *   [btnCancelClassName](#btncancelclassname)
    *   [headClassName](#headclassname)
    *   [bodyClassName](#bodyclassname)
    *   [trClassName](#trclassname)
    *   [thClassName](#thclassname)
    *   [tdClassName](#tdclassname)
    *   [inputClassName](#inputclassname)
    *   [btnValidateElement](#btnvalidateelement)
    *   [btnDeleteElement](#btndeleteelement)
    *   [btnCancelElement](#btncancelelement)
    *   [disableUpdate](#disableupdate)
    *   [disableDelete](#disabledelete)
    *   [disableInsert](#disableinsert)
    *   [tableElement](#tableelement)
    *   [tbodyElement](#tbodyelement)
    *   [theadElement](#theadelement)
    *   [thElement](#thelement)
    *   [trElement](#trelement)
    *   [tdElement](#tdelement)
    *   [filler](#filler)
    *   [rowClassName](#rowclassname)
    *   [insertClassName](#insertclassname)
*   [ReactEditList](#reacteditlist)
    *   [Parameters](#parameters)

## Element

Field type

`id` means a hidden field that will be carried on by react-edit-list without any processing

`string` and `number` have default rendering and input components

`custom` allows you to define your own rendering and input components

Passing an array of `name`/`value` pairs allows defining of an enum field

Type: (`"id"` | `"string"` | `"number"` | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<{name: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), value: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined))}> | `"custom"`)

## Schema

Schema for the data

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<{name: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), type: [Element](#element)}>

## Row

A row of data

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Value>

## Props

ReactEditList properties

### schema

The schema for the data

Type: [Schema](#schema)

### onLoad

Will be called to load the data, can be asynchronous

Type: function (): ([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Row](#row)> | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Row](#row)>>)

### format

Custom field formatters

Each field formatter must be a React component

It will receive the value to be rendered in `props.value`

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Formatter>

#### Examples

```javascript
function DefaultFormatString(props: {value: Value}): JSX.Element {
  return <React.Fragment>{props.value as string}</React.Fragment>;
}
```

### edit

Custom field editors

Each field editor must be a React component

It will receive the previous value in `props.value` and
should call `props.onChange` to update it

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Editor>

#### Examples

```javascript
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
```

### editProps

Custom props to be passed to the field editors

Type: Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), any>>

### headers

Custom headers, set to `null` to completely disable headers

Type: (Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), JSX.Element> | null)

### onChange

Called on every change with all the elements

Return `false` to deny the operation

Return `true` to trigger a refresh through `onLoad`

Return `undefined` for default behavior

Type: function (data: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Row](#row)>): ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void)>)

### onInsert

Called after insertion of a new element

Return `false` to deny the operation

Return a new item to modify its contents

Type: function (item: [Row](#row)): ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Row](#row) | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Row](#row))>)

### onUpdate

Called after updating an existing element

Return `false` to deny the operation

Return a new item to modify its contents

Type: function (updated: [Row](#row), old: [Row](#row)): ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Row](#row) | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Row](#row))>)

### onDelete

Called after deleting an element

Return `false` to deny the operation

Type: function (item: [Row](#row)): ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void | [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | void)>)

### defaultValues

Optional default values for new elements

Type: [Row](#row)

### className

Optional CSS class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### btnValidateClassName

Optional validate button class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### btnDeleteClassName

Optional delete button class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### btnCancelClassName

Optional cancel button class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### headClassName

Optional table head class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### bodyClassName

Optional table body class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### trClassName

Optional table TR class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### thClassName

Optional table TH class name

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)

### tdClassName

Optional table TD class name

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | Record<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>)

### inputClassName

Optional table INPUT class name

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### btnValidateElement

Optional custom button element

Type: JSX.Element

### btnDeleteElement

Optional custom button element

Type: JSX.Element

### btnCancelElement

Optional custom button element

Type: JSX.Element

### disableUpdate

Disable updating

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### disableDelete

Disable deleting

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### disableInsert

Disable inserting

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### tableElement

Element to use instead of <table>

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### tbodyElement

Element to use instead of <tbody>

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React.FunctionComponent<{className: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?}>)

### theadElement

Element to use instead of <thead>

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React.FunctionComponent<{className: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?}>)

### thElement

Element to use instead of <th>

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React.FunctionComponent<{className: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?}>)

### trElement

Element to use instead of <tr>

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React.FunctionComponent<{className: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?, dataid: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)?}>)

### tdElement

Element to use instead of <td>

Element must accept mouse and keyboard input

Type: ([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | React.FunctionComponent<{className: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?, onClick: function (e: React.MouseEvent): void?, onKeyDown: function (e: React.KeyboardEvent): void?}>)

### filler

Element to use for the empty row that allows adding a new item

Type: JSX.Element

### rowClassName

Optional class to use for regular rows

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### insertClassName

Optional class to use for the empty row allowing insertion

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## ReactEditList

An universal editable list for React

### Parameters

*   `props`  {Props}

Returns **JSX.Element** 
