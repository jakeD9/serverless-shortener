import { expect, haveResource } from "@aws-cdk/assert";
import * as sst from "@serverless-stack/resources";
import ShortStack from "../stacks/ShortStack";

test("Test Stack", () => {
  const app = new sst.App();
  // WHEN
  const stack = new ShortStack(app, "test-stack");
  // THEN
  expect(stack).to(haveResource("AWS::Lambda::Function"));
});
