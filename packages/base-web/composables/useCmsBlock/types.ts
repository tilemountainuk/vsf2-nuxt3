export type CmsBlocksInputType = {
  page?: string,
  identifiers?: string | string[],
  includeDefaults?: boolean
}

export type CmsBlock = {
  identifier: string;
  id?: number;
  title: string;
  content: string;
  [key: string]: any;
}

// Define a type for appConfig.cmsBlocks
export type AppConfigCMSBlocks = {
  default: string[];
  pages: Record<string, string[]>; // This allows any string index to be used
};
