import type { StackProps, Api } from "@serverless-stack/resources";

// extension of sst.StackProps so typescript doesn't vomit all over dependencies being added
export interface StackedProps extends StackProps {
    api: Api
}
