const {default: dynamic} = require("next/dynamic");
import {Suspense} from "react";

const EditorComp = dynamic(() => import("./EditorComponent"), {ssr: false});

export default function Editor({
  markdown,
  editorRef,
  onChange,
  readOnly = false,
}) {
  return (
    <>
      <div className="rounded-lg border-b border-border-100 dark:border-darkColor-400">
        <Suspense fallback={null}>
          <EditorComp
            markdown={markdown}
            editorRef={editorRef}
            onChange={onChange}
            readOnly={readOnly}
          />
        </Suspense>
      </div>
    </>
  );
}
