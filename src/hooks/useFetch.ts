import { ref, Ref } from "vue";

interface FetchResult<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  isLoading: Ref<boolean>;
  fetchData: () => Promise<void>;
}

export function useFetch<T>(url: string): FetchResult<T> {
  const data: Ref<T | null> = ref(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: T = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, fetchData };
}
