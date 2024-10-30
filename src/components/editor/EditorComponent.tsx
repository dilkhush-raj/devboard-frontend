"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  ShowSandpackInfo,
  InsertCodeBlock,
  InsertSandpack,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  ListsToggle,
  DiffSourceToggleWrapper,
  CreateLink,
  diffSourcePlugin,
  InsertTable,
  tablePlugin,
  linkDialogPlugin,
  BlockTypeSelect,
  InsertImage,
  imagePlugin,
  InsertThematicBreak,
} from "@mdxeditor/editor";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

const simpleSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: "",
    },
  ],
};

const Editor = ({markdown, editorRef, onChange, readOnly = false}) => {
  const {theme, setTheme} = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const plugins = [
    codeBlockPlugin({defaultCodeBlockLanguage: "js"}),
    codeMirrorPlugin({codeBlockLanguages: {js: "JavaScript", css: "CSS"}}),
    headingsPlugin(),
    listsPlugin(),
    quotePlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    imagePlugin(),
    diffSourcePlugin(),
    thematicBreakPlugin(),
  ];

  if (!readOnly) {
    plugins.push(
      toolbarPlugin({
        toolbarContents: () => (
          <>
            <UndoRedo />
            <BlockTypeSelect />
            <BoldItalicUnderlineToggles />
            <ListsToggle />
            <InsertThematicBreak />
            <InsertTable />
            <InsertImage />
            <InsertCodeBlock />
            <DiffSourceToggleWrapper />
          </>
        ),
      })
    );
  }

  return (
    <MDXEditor
      onChange={onChange}
      readOnly={readOnly}
      className={isMounted && theme === "light" ? "" : "dark-theme dark-editor"}
      markdown={markdown}
      ref={editorRef}
      plugins={plugins}
    />
  );
};

export default Editor;
