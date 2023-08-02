type ImageLoaderProps = {
  url: string;
};
type CloudinaryLoader = (image: ImageLoaderProps) => string;

export const cloudinaryLoader: CloudinaryLoader = (url) => {
  const [imagePathWithoutParams, searchParams = ''] = url.split('?');
  const segmentsParameter = imagePathWithoutParams.split('/').filter(Boolean);
  const sapContextSearchParameter = new URLSearchParams(searchParams).get('context');

  const route = createRoute('/sap/:segments*/context/:context');
  return route.compile({ segments: segmentsParameter, context: sapContextSearchParameter });
};
