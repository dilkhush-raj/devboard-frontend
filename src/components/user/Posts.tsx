"use client";
import {Tabs, Tab} from "@nextui-org/tabs";
import UserBlog from "./Blog";
import Saved from "./Saved";
import UserQuestion from "./Question";
import UserAnswer from "./Answer";
import useUserStore from "@/stores/useUserStore";
import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function Posts({user, username}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");
  const [selectedTab, setSelectedTab] = useState(tab || "blog");
  const userStore = useUserStore((state) => state);
  return (
    <div>
      <Tabs
        aria-label="Options"
        fullWidth
        variant="underlined"
        selectedKey={selectedTab}
        onSelectionChange={(key) => {
          // @ts-ignore
          setSelectedTab(key);
          router.push(`/@${username}/?tab=${key}`);
        }}
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none overflow-hidden border border-border-100 dark:border-darkColor-400 rounded-lg p-2 mt-4 border-b border-divider bg-darkColor-200 dark:bg-darkColor-300",
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
        {/* @ts-ignore */}
        {userStore?.isAuth && userStore?.user?._id === user && (
          <Tab key="saved" title="Saved">
            <Saved author={undefined} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
