import { Keyword } from "./types";

/**
 * A photo object.
 */
interface Photo {
  id: string;
  name: string;
  keywords: Keyword[];
}

/**
 * A photo object with a `src` property.
 */
interface PhotoWithSrc extends Photo {
  src: string;
}

/**
 * A map of photo IDs to photo objects.
 */
type PhotoIndex<T> = Map<string, T>;

/**
 * indexedPhotos returns a map of photo IDs to photo objects.
 * @returns { photos: Photo[]; indexedPhotos: PhotoIndex<number>; } A map of photo IDs to photo objects.
 */
function indexPhotos() {
  const photos = [
    {
      id: "f674369d-8f70-4412-bb1c-f3063f886a23",
      name: "DSCF7471",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "e40a30fe-9412-4927-86a3-0b3306297f2b",
      name: "DSCF0907",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "c55530b1-1dc1-47a2-8126-05b383eadbd2",
      name: "DSCF5972",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "f1bae8b1-8f10-4fad-a4bf-308b6001ff10",
      name: "DSCF7055",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "f8f9a20e-59c5-4693-951e-d158b9d14d42",
      name: "DSCF5907",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "6906b212-c238-4f48-bada-f5f49a7ac22b",
      name: "DSCF5948",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "19ca2838-c5c1-4e31-8167-31671392fdd5",
      name: "DSCF7418",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "6532520f-0a0b-4dec-a0f0-a5a7a2662752",
      name: "DSCF1916",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "d5e3776a-b98c-4eb9-ac2c-352ef263694d",
      name: "DSCF1936",
      keywords: ["black-and-white", "low-key"],
    },
    {
      id: "4ff52745-5336-44a1-9ae6-2403e9ac96e5",
      name: "DSCF3259",
      keywords: ["black-and-white"],
    },
    {
      id: "7a1ce5a9-e09e-477d-9665-48089a6f148e",
      name: "DSCF5703",
      keywords: ["black-and-white"],
    },
    {
      id: "936DA01F-9ABD-4D9D-80C7-02AF85C822A8",
      name: "DSCF6525",
      keywords: ["architecture", "color"],
    },
    {
      id: "F9168C5E-CEB2-4FAA-B6BF-329BF39FA1E4",
      name: "DSCF6475",
      keywords: ["color"],
    },
    {
      id: "DDD1F6F7-EBC4-42A7-93DB-5D5F0B5EF1D5",
      name: "DSCF6480",
      keywords: ["color"],
    },
    {
      id: "3C2A0E5F-CC0B-4E5F-9672-5F5B547F44E9",
      name: "DSCF6481",
      keywords: ["color"],
    },
    {
      id: "DDDA7061-E8FB-45CB-9938-D3D4FDC4E4CC",
      name: "DSCF6496",
      keywords: ["color"],
    },
    {
      id: "B567C0EA-7144-4E72-A7AB-6DA1D6EBF9D8",
      name: "DSCF6509",
      keywords: ["color"],
    },
    {
      id: "0D704F73-3D79-4E2F-99D1-2F6FDDD1E8A8",
      name: "DSCF6510",
      keywords: ["color"],
    },
    {
      id: "4DA6E8F6-D5A1-4571-B1B0-737C6C8F6F9E",
      name: "DSCF6518",
      keywords: ["color"],
    },
  ] as Photo[];

  const indexedPhotos: PhotoIndex<number> = new Map();
  photos.forEach((photo, index) => indexedPhotos.set(photo.id, index));

  return { photos, indexedPhotos };
}

export { indexPhotos, Photo, PhotoWithSrc, PhotoIndex };
