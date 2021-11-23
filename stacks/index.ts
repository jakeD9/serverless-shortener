import * as sst from "@serverless-stack/resources";

import ClientStack from "./ClientStack";
import ShortStack from "./ShortStack";
import type { StackedProps } from "./models";

export default function main(app: sst.App): void {
  // set default runtime for all lambda functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x",
    environment: {
      TABLE_NAME: process.env.TABLE_NAME ?? "",
    },
  });

  const shortStack = new ShortStack(app, "short-stack");

  // pass api as dependency to static site client
  new ClientStack(app, "client", {
    api: shortStack.api,
  } as StackedProps);
}
