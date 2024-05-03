export const ImageAdpter = async (
  formData: FormData,
): Promise<PostImageToCloudnary> => {
  // preencha esses campos com informações da sua conta na Cloudinary
  if (!process.env.CLOUDNARY_API_KEY) {
    throw new Error('No api key to upload image');
  }

  const cloudName = process.env.CLOUDNARY_CLOUD_NAME!;
  const api_key = process.env.CLOUDNARY_API_KEY!;
  const upload_preset = process.env.CLOUDNARY_UPLOAD_PRESET!;
  const folderName = process.env.CLOUDNARY_FOLDER!;

  return postImage({
    formData: formData,
    requestBody: {
      cloud_name: cloudName,
      api_key: api_key,
      folder: folderName,
      upload_preset: upload_preset,
      public_id: (Math.random() * 1000 * Math.PI).toFixed(),
    },
  });
};

async function postImage({
  formData,
  requestBody: { cloud_name, public_id, api_key, upload_preset, folder },
}: {
  formData: FormData;
  requestBody: {
    cloud_name: string;
    public_id: string;
    api_key: string;
    upload_preset: string;
    folder: string;
  };
}) {
  // change those variables

  const resource_type = 'image';

  const bodyRequest = [
    { key: 'public_id', value: public_id },
    { key: 'api_key', value: api_key },
    { key: 'upload_preset', value: upload_preset },
    { key: 'folder', value: folder },
  ];

  const url = `https://api.cloudinary.com/v1_1/
  ${cloud_name}/${resource_type}/upload`;

  for (const item of bodyRequest) {
    formData.append(item.key, item.value);
  }

  const options = {
    body: formData,
    method: 'POST',
  };

  const response = await fetch(url, options);
  const data: PostImageToCloudnary = await response.json();
  return data;
}
