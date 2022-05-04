/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

import './app.css';

const examples = {
    simple: {title: 'Simple', file: 'Simple'},
    advanced: {title: 'Advanced', file: 'Advanced'},
    grid: {title: 'Custom Grid', file: 'CustomGrid'},
    pagination: {title: 'Pagination', file: 'Pagination'},
    custom: {title: 'Custom Field', file: 'CustomField'},
    reordering: {title: 'Reordering', file: 'Reordering'}
};

// The examples use a code-loading technique that I have described in
// https://mmomtchev.medium.com/making-examples-displaying-code-along-its-output-with-webpack-a28dcf5439c6

const ReadmeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './ReadmeBlock'));
const CodeBlock = React.lazy(() => import(/* webpackPrefetch: true */ './CodeBlock'));

for (const ex of Object.keys(examples)) {
    examples[ex].comp = React.lazy(
        () => import(/* webpackPrefetch: true */ `./ex/${examples[ex].file}.tsx`)
    );
    examples[ex].code = import(
        /* webpackPrefetch: true */ `!!html-loader?{"minimize":false}!./jsx-loader.ts!./ex/${examples[ex].file}.tsx`
    ).then((code) => code.default);
}

const LeftMenuItem = (props): JSX.Element => (
    <Link to={props.id}>
        <Button className='w-100' variant='light'>
            {props.title}
        </Button>
    </Link>
);

const App = (): JSX.Element => {
    return (
        <Router>
            <h1 className='m-2'>
                <strong>react-edit-list {VERSION} Examples</strong>
            </h1>
            <div className='d-flex flex-row p-3'>
                <div className='d-flex flex-column left-menu me-2'>
                    <LeftMenuItem id={''} title={'Home'} />
                    {Object.keys(examples).map((e) => (
                        <LeftMenuItem key={e} id={e} title={examples[e].title} />
                    ))}
                </div>
                <div className='d-flex flex-column w-100 overflow-hidden'>
                    <div className='fluid-container'>
                        <Route exact path='/'>
                            <div className='ml-2'>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <ReadmeBlock />
                                </React.Suspense>
                            </div>
                        </Route>
                        {Object.keys(examples).map((e) => (
                            <Route key={e} path={`/${e}`}>
                                <div className='row'>
                                    <div className='col-12 col-xl-5 mb-1'>
                                        <React.Suspense fallback={<div>Loading component...</div>}>
                                            {React.createElement(examples[e].comp)}
                                        </React.Suspense>
                                    </div>
                                    <div className='col-12 col-xl-7 codeblock'>
                                        <React.Suspense fallback={<div>Parsing code...</div>}>
                                            <CodeBlock code={examples[e].code} />
                                        </React.Suspense>
                                    </div>
                                </div>
                            </Route>
                        ))}
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
