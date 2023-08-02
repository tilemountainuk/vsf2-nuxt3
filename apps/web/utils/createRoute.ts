import { Prettify } from '@storefront-ui/shared';
import { compile, match } from 'path-to-regexp';
import { CompileArguments, ExtractParams } from '~/utils/types';

export const createRoute = <TPattern extends string, TParams extends object = Prettify<ExtractParams<TPattern>>>(
  pattern: TPattern,
) => ({
  compile(...arguments_: CompileArguments<TParams>): string {
    const [parameters] = arguments_;
    return compile<TParams>(pattern)(parameters as TParams);
  },
  match: match<TParams>(pattern),
});
