import * as sst from "@serverless-stack/resources";
import ShortStack from "./ShortStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs14.x"
  });

  new ShortStack(app, "short-stack");
}
