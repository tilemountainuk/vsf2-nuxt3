<template>
  <form
    class="grid grid-cols-1 md:grid-cols-[50%_1fr_120px] gap-4"
    data-testid="address-form"
    @submit.prevent="storeAddressFormData"
  >
    <label>
      <UiFormLabel>{{ $t('form.firstNameLabel') }}</UiFormLabel>
      <SfInput name="firstName" autocomplete="given-name" v-model="defaultValues.firstname" required />
    </label>
    <label class="md:col-span-2">
      <UiFormLabel>{{ $t('form.lastNameLabel') }}</UiFormLabel>
      <SfInput name="lastName" autocomplete="family-name" v-model="defaultValues.lastname" required />
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.phoneLabel') }}</UiFormLabel>
      <SfInput name="telephone" type="tel" autocomplete="tel" v-model="defaultValues.telephone" required />
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.countryLabel') }}</UiFormLabel>
      <SfSelect
        v-model="defaultValues.country_code"
        name="country"
        :placeholder="$t('form.selectPlaceholder')"
        autocomplete="country-name"
        required
      >
        <option v-for="country in countries" :key="country">{{ country }}</option>
      </SfSelect>
    </label>
    <label class="md:col-span-2">
      <UiFormLabel>{{ $t('form.streetNameLabel') }}</UiFormLabel>
      <SfInput name="streetName" autocomplete="address-line1" v-model="defaultValues.streetName" required />
      <UiFormHelperText>{{ $t('form.streetNameHelp') }}</UiFormHelperText>
    </label>
    <label>
      <UiFormLabel>{{ $t('form.streetNumberLabel') }}</UiFormLabel>
      <SfInput name="streetNumber" v-model="defaultValues.streetNumber" />
      <UiFormHelperText>{{ $t('form.streetNumberHelp') }}</UiFormHelperText>
    </label>
    <label class="md:col-span-3">
      <UiFormLabel>{{ $t('form.cityLabel') }}</UiFormLabel>
      <SfInput name="city" autocomplete="address-level2" v-model="defaultValues.city" required />
    </label>
    <label>
      <UiFormLabel>{{ $t('form.postalCodeLabel') }}</UiFormLabel>
      <SfInput name="postalCode" autocomplete="postal-code" v-model="defaultValues.postcode" required />
    </label>

    <label v-if="type === 'billingAddress'" class="md:col-span-3 flex items-center gap-2">
      <SfCheckbox name="useAsShipping" v-model="useForShipping" />
      {{ $t('form.useAsShippingLabel') }}
    </label>

    <div class="md:col-span-3 flex flex-col-reverse md:flex-row justify-end mt-6 gap-4">
      <SfButton type="reset" class="" variant="secondary" @click="$emit('on-close')">
        {{ $t('contactInfo.cancel') }}
      </SfButton>
      <SfButton type="submit" class="min-w-[120px]" :disabled="isCartUpdateLoading">
        <SfLoaderCircular v-if="isCartUpdateLoading" class="flex justify-center items-center" size="sm" />
        <span v-else>
          {{ $t('contactInfo.save') }}
        </span>
      </SfButton>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { SfButton, SfCheckbox, SfInput, SfLoaderCircular, SfSelect } from '@storefront-ui/vue';
import { useCart } from '~/composables/useCart/useCart';
import type { AddressFormProps } from './types';

const props = defineProps<AddressFormProps>();

const isCartUpdateLoading = false;

const { savedAddress } = toRefs(props);
const { cartId } = useCart();

const defaultValues = ref({
  firstname: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.firstname
    : savedAddress?.value?.firstname ?? '',
  lastname: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.lastname
    : savedAddress?.value?.lastname ?? '',
  telephone: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.telephone
    : savedAddress?.value?.telephone ?? '',
  country_code: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.country?.code
    : savedAddress?.value?.country?.code ?? '',
  streetName: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.street[0] ?? ''
    : savedAddress?.value?.street[0] ?? '',
  streetNumber: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.street[1] ?? ''
    : savedAddress?.value?.street[1] ?? '',
  city: Array.isArray(savedAddress?.value) ? savedAddress?.value?.[0]?.city ?? '' : savedAddress?.value?.city ?? '',
  postcode: Array.isArray(savedAddress?.value)
    ? savedAddress?.value?.[0]?.postcode ?? ''
    : savedAddress?.value?.postcode ?? '',
});

const useForShipping = ref(false);
const countries = ['GB'];
const emit = defineEmits(['on-save', 'on-close']);

const { saveBillingAddress, saveShippingAddress } = useCheckout();

const storeAddressFormData = async () => {
  const params = {
    cart_id: cartId.value,
    billing_address: {
      address: {
        firstname: defaultValues.value.firstname,
        lastname: defaultValues.value.lastname,
        telephone: defaultValues.value.telephone,
        country_code: defaultValues.value.country_code,
        street: [defaultValues.value.streetName, defaultValues.value.streetNumber],
        city: defaultValues.value.city,
        postcode: defaultValues.value.postcode,
      },
      use_for_shipping: useForShipping.value,
    },
  };
  if (props.type === 'shippingAddress') {
    const paramsShipping = {
      cart_id: cartId.value,
      shipping_addresses: [
        {
          address: {
            firstname: defaultValues.value.firstname,
            lastname: defaultValues.value.lastname,
            telephone: defaultValues.value.telephone,
            country_code: defaultValues.value.country_code,
            street: [defaultValues.value.streetName, defaultValues.value.streetNumber],
            city: defaultValues.value.city,
            postcode: defaultValues.value.postcode,
          },
        },
      ],
    };
    const result = await saveShippingAddress(paramsShipping);
    if (result === 'Success') {
      emit('on-save');
    }
  } else {
    const result = await saveBillingAddress(params);
    if (result === 'Success') {
      emit('on-save');
    }
  }
};
</script>
