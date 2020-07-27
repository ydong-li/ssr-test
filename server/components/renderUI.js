import React from "react";

export default function RenderUI({ content, initialProps }) {
  return (
    <html>
      <body>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_PROPS__=${JSON.stringify(
              initialProps
            ).replace(/</g, "\\u003c")};`,
          }}
        />
      </body>
    </html>
  );
}
