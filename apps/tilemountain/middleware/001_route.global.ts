import { RoutableInterface } from '@vue-storefront/magento-types';
import { useSdk } from 'sdk';

interface ExtendedRoutableInterface extends RoutableInterface {
    sku?: string | undefined;
    uid?: string | undefined;
    identifier?: string | undefined;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        const mageRoute = await useSdk().magento.route({ url: to.path });
        // console.log('ROOT>>mageRouteResponseWouldBe', mageRoute);
        const route = mageRoute?.data?.route as ExtendedRoutableInterface;
        const routeData = {
            type: route?.type,
            sku: route?.sku,
            uid: route?.uid,
            identifier: route?.identifier
        };

        if (routeData.type == null) {
            return;
        }

        const routeState = useState('routeData', () => routeData);

        if (to.path !== from.path) {
            routeState.value = routeData;
        }
    } catch (error) {
        throw new Error(error as string);
    }
});
