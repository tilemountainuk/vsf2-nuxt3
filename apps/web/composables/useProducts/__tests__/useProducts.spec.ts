import { useProducts } from '../useProducts';

describe('useProducts', () => {
  it('should return products', async () => {
    const { fetchProducts, data } = useProducts();
    const route = useRoute();
    const slug = route.params.slug as string;
    await fetchProducts(slug);

    expect(data.value).not.toBeUndefined();
  });
});
