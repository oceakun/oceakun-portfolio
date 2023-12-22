import React from 'react'
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-light";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeBlock() {
  const codeString = "import 'dfjksdf'; \n(num) => num + 1; \nconst v = 5;";
  return (
    <SyntaxHighlighter
      className="bg-[#50d71e]"
      language="javascript"
      style={dark}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}

export default CodeBlock