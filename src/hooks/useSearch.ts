import { useQuery } from "react-query";
import { getAddressByQuery } from "../api/api";
import { AddressType } from "../types/address";

export default function useSearch(query: string) {
  
  return useQuery<AddressType[]>(["getAddressByQuery", query], () => getAddressByQuery(query), {
      enabled: !!query,
      suspense: false,
  })
  
}
