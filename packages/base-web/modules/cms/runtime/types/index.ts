
// Define a type for appConfig.cmsBlocks
export type AppConfigCMS = {
  blocks: {
    default: string[];
    pages: Record<string, string[]>; // This allows any string index to be used
  }
  [key: string]: any
};

export interface BlockItem {
  identifier: string,
  block: any
}

export interface CmsBlockState {
  loading: boolean;
  items: BlockItem[];
  blocksData: {
    [key: string]: string[]
  };
}
