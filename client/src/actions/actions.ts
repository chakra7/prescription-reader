import { useMutation } from "@tanstack/react-query";

const { mutateAsync } = useMutation({
  mutationFn: async (formData: FormData) => {
    const response = await fetch("/api/uploadfile", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    return response;
  },
});

export { mutateAsync };