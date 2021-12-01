import * as sst from "@serverless-stack/resources";
import type { StackedProps } from "./models";

export default class ClientStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: StackedProps) {
    super(scope, id, props);
    const { api }: { api: sst.Api } = props;

    const client = new sst.NextjsSite(this, "StaticSite", {
      path: "client",
      environment: {
        CLIENT_API_URL: api.url,
        CLIENT_REGION: scope.region,
      },
    });

    this.addOutputs({
      SiteUrl: client.url,
    });
  }
}
