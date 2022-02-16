"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const ReactMarkdown = require('react-markdown');
const _ = require('lodash');
let render = require('react-test-renderer').create;
var ReactRenderer = require('commonmark-react-renderer').renderers;
require('jest');
function logMembers(name, obj) {
    console.log(`\r\n${name}:`);
    for (let key in obj) {
        console.log(`\t${key} = ${obj[key]}`);
    }
}
var logRenderer = {};
for (let key in ReactRenderer) {
    if (ReactRenderer.hasOwnProperty(key)) {
        logRenderer[key] = function (props) {
            logMembers(key, props);
            if (_.isFunction(ReactRenderer[key])) {
                return ReactRenderer[key](props);
            }
            else {
                return React.createElement("div", __assign({}, props));
            }
        };
    }
}
let defRenderer = logRenderer;
let input = `
<div>
	HtmlBlock
</div>

<span>HtmlInline</span>

	indentend block
	
\`\`\`csharp
fenced block
\`\`\`

\`inline code\`

# Heading 1

a
b

[link](url)

![alt](image)

1. list

a     
b

*italic*

**strong**

----

> Block quote



df


Paragraph

\`\`\`csharp
fenced code
\`\`\`

	indented code
	
	
Here is \`inline code\`



1. ListItem
<div>
	HtmlBlock
</div>`;
let s = render(React.createElement(ReactMarkdown, {source: input, allowNode: node => {
    return true;
}, childAfter: React.createElement("span", null, "After"), childBefore: React.createElement("span", null, "Before"), className: "className", skipHtml: false, softBreak: "br", unwrapDisallowed: true, transformLinkUri: str => {
    return str + "x";
}, transformImageUri: str => {
    return str + "x";
}, escapeHtml: false, containerTagName: "div", containerProps: { className: "hi" }, renderers: logRenderer}));
//# sourceMappingURL=tests.js.map