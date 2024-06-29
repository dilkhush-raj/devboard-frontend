// app/providers.tsx
"use client";

import {NextUIProvider} from "@nextui-org/react";

export function NextUIProviderWrapper({children}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
