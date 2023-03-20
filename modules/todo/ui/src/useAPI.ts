import type { Ref } from "vue";
export function useAPI<T extends { _id: string; updatedAt: string }>(
  store: Ref<T>
) {
  const apos = window.apos;
  const { action } = apos.modules["todo"];

  const get = async () => {
    try {
      const response = await apos.http.get(`${action}/${store.value._id}`, {
        busy: false,
      });
      console.log("POLL", response, store.value);
      if (response && response.updatedAt !== store.value.updatedAt) {
        store.value = response;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const update = async () => {
    try {
      const response = await apos.http.put(`${action}/${store.value._id}`, {
        body: store.value,
      });
      if (response && response.updatedAt !== store.value.updatedAt) {
        store.value = response;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { get, update };
}
