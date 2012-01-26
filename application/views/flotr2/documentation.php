<style type="text/css">
.editor {
    position: relative;
}
.editor .render {
    height: 240px;
    width: 320px;
    margin: 8px auto;
}
.editor .source {
    border: 1px solid #ddd;
    border-radius: 3px;
}
.editor .controls {
    position: relative;
    z-index: 100;
    right: 8px;
    top: -12px;
}
.editor .controls button {
    float: right;
}
.editor .errors {
    padding: 8px;
    font-size: 12px;
    background: #fee;
    border-bottom: 1px solid #eee;
}
.editor .errors .error {
    font-weight: bold
}
.editor .errors .message {
    font-style: italic;
}
.editor .errors .position {
    display: block;
    margin-top: 4px;
}

/* html type */
.editor.html .render {
    height: 400px;
    width: 800px;
    text-align: center;
}
.editor.html .render iframe {
    height: 100%;
    width: 100%;
    border: none;
}

/* CodeMirror */
.CodeMirror {
    background: #fafafa;
}
.CodeMirror.CodeMirror-focused {
}
.CodeMirror-scroll {
    height: auto;
    overflow: visible;
}
.CodeMirror-lines pre,
.CodeMirror-gutter pre {
    line-height: 16px;
}
</style>
<h2>Introduction</h2>
<div class="editor basic">
</div>
<h2>Development</h2>
<h2>IE</h2>
<p>Flotr2 is fully supported in IE 9 and newer.  For older versions of IE, EXCanvas or flashcanvas may be used.</p>

