import React, { useState } from "react";

function parseMarkdown(text) {
  const lines = text.split("\n");
  const elements = [];

  lines.forEach((line, index) => {
    // h1
    if (line.startsWith("# ")) {
      elements.push(<h1 key={index}>{line.replace("# ", "")}</h1>);
    }
    // empty line → skip
    else if (line.trim() === "") {
      return;
    }
    // paragraph + bold support
    else {
      const parts = line.split(/(\*\*.*?\*\*)/g);

      elements.push(
        <p key={index}>
          {parts.map((part, i) =>
            part.startsWith("**") ? (
              <strong key={i}>{part.replace(/\*\*/g, "")}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  });

  return elements;
}

function MarkdownEditor() {
  const [text, setText] = useState("");

  return (
    <div className="editor-container">
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write Markdown here..."
      />

      <div className="preview">
        {parseMarkdown(text)}
      </div>
    </div>
  );
}

export default MarkdownEditor;
