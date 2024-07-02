import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import UserBlog from "./Blog";
import Saved from "./Saved";

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
        <Tab key="questions" title="Questions">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="answers" title="Answers">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="blog" title="Blog">
          <UserBlog author={user} />
        </Tab>
        <Tab key="saved" title="Saved">
          <Saved />
        </Tab>
      </Tabs>
    </div>
  );
}
