export type Nullable<TType> = TType | null | undefined;

export type RequireAtLeastOne<TObject, Keys extends keyof TObject = keyof TObject> = Pick<
  TObject,
  Exclude<keyof TObject, Keys>
> &
  {
    [TKey in Keys]-?: Required<Pick<TObject, TKey>> & Partial<Pick<TObject, Exclude<Keys, TKey>>>;
  }[Keys];

export type RouteParameter = Nullable<string | number>;

export type ExtractParams<TPattern extends string> = TPattern extends `${infer Head}/${infer Tail}`
  ? Head extends `:${infer Parameter}`
    ? Parameter extends `${infer OptionalPrameter}?`
      ? { [TKey in OptionalPrameter]?: RouteParameter } & ExtractParams<Tail>
      : Parameter extends `${infer OptionalSegment}*`
      ? { [TKey in OptionalSegment]?: RouteParameter | RouteParameter[] } & ExtractParams<Tail>
      : Parameter extends `${infer Segment}+`
      ? { [TKey in Segment]: RouteParameter | RouteParameter[] } & ExtractParams<Tail>
      : { [TKey in Parameter]: RouteParameter } & ExtractParams<Tail>
    : ExtractParams<Tail>
  : TPattern extends `:${infer LastParameter}`
  ? LastParameter extends `${infer OptionalPrameter}?`
    ? { [TKey in OptionalPrameter]?: RouteParameter }
    : LastParameter extends `${infer OptionalSegment}*`
    ? { [TKey in OptionalSegment]?: RouteParameter | RouteParameter[] }
    : LastParameter extends `${infer Segment}+`
    ? { [TKey in Segment]: RouteParameter | RouteParameter[] }
    : { [TKey in LastParameter]: RouteParameter }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {};

export type CompileArguments<TParams extends object> = TParams extends Record<string, never>
  ? []
  : TParams extends RequireAtLeastOne<TParams>
  ? [parameters: TParams]
  : [parameters?: TParams];
