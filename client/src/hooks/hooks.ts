import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

interface FileText {
  response: string;
}

export const useUploadFile = () => {
  const queryClient = useQueryClient()
  return useMutation({
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
    onSuccess: async (data) => {
      const jsonData: FileText = await data.json();
      console.log("File uploaded successfully:", jsonData);
      queryClient.setQueryData(["file"], jsonData)
    }
  });
}

export const useGetFileText = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["file"],
    queryFn: async () => {
      return queryClient.getQueryData<FileText>(["file"]);
    }
  })
}
