import * as React from 'react';

import exampleCss from '!!raw-loader!./example.css';

const CodePenButton = React.memo(function _CodePenButton(props: {
    text: Promise<string>;
    title: string;
}) {
    const [text, setText] = React.useState('loading()');
    React.useEffect(() => {
        props.text.then((r) => {
            r = r.replace(
                /import (.*) from '(.*)'/g,
                (match, g1, g2) => `import ${g1} from "https://cdn.skypack.dev/${g2}"`
            );
            r = r.replace(/import '.*';\n/g, '');
            r = r.replace(/export default function (.*)/, 'function Comp() {');
            r = 'import * as ReactDOM from "https://cdn.skypack.dev/react-dom";\n' + r;
            r += '\nReactDOM.render(<Comp />, document.getElementById("root"));\n';
            setText(r);
        });
    }, [props.text]);

    return (
        <form action='https://codepen.io/pen/define' method='POST' target='_blank'>
            <input
                type='hidden'
                name='data'
                value={JSON.stringify({
                    title: 'react-edit-list ' + props.title,
                    html: '<div id="root"></div>',
                    js: text,
                    js_pre_processor: 'typescript',
                    css: exampleCss,
                    js_external:
                        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js',
                    css_external:
                        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css;https://unpkg.com/react-day-picker/dist/style.css'
                })}
            />
            <input className='btn btn-secondary mb-2' type='submit' value='Edit on CodePen' />
        </form>
    );
});

export default CodePenButton;
