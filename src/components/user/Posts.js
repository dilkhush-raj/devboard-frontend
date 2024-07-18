"use client";
import {Tabs, Tab} from "@nextui-org/react";
import UserBlog from "./Blog";
import Saved from "./Saved";
import UserQuestion from "./Question";
import UserAnswer from "./Answer";

export default function Posts({user}) {
  return (
    <div>
      <Tabs
        aria-label="Options"
        fullWidth
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none border border-border-100 dark:border-darkColor-400 rounded-lg p-2 mt-4 border-b border-divider bg-darkColor-200 dark:bg-darkColor-300",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit",
          tabContent: "",
        }}
      >
        <Tab key="blog" title="Blog">
          <UserBlog author={user} />
        </Tab>
        <Tab key="questions" title="Questions">
          <UserQuestion author={user} />
        </Tab>
        <Tab key="answers" title="Answers">
          <UserAnswer author={user} />
        </Tab>
        <Tab key="saved" title="Saved">
          <Saved />
        </Tab>
      </Tabs>
    </div>
  );
}
