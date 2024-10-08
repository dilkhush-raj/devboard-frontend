import {Spinner} from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-60px)] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
