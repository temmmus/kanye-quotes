<template>
  <div>
    <h1 :class="{ default: isDefault, error: isError }">
      {{ displayText }}
    </h1>
    <button @click="fetchData" :disabled="isLoading">
      {{ isLoading ? "Loading..." : "Get a quote" }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useFetch } from "../hooks/useFetch";

interface QuoteResponse {
  quote: string;
}

export default {
  setup() {
    const url = "https://api.kanye.rest/";
    const { data, error, isLoading, fetchData } = useFetch<QuoteResponse>(url);

    const defaultText = "Click the button to get a quote bro";

    const errorText = computed(() => error.value?.message || "");
    const quoteText = computed(() =>
      data.value?.quote ? `"${data.value.quote}"` : ""
    );
    const displayText = computed(
      () => errorText.value || quoteText.value || defaultText
    );

    const isError = computed(() => !!error.value);
    const isDefault = computed(() => !isError.value && !quoteText.value);

    return {
      displayText,
      isDefault,
      isError,
      isLoading,
      fetchData,
    };
  },
};
</script>

<style scoped>
.default {
  color: #646cff;
}
.error {
  color: #960000;
}
</style>
