import React from "react";

export default function RenderUI({ content, state }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </>
  );
}
