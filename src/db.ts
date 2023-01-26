import { Categories } from "./types";

export interface PhotoAsset {
  id: string;
  name: string;
  keywords: Categories[];
}

export default [
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
] as PhotoAsset[];
