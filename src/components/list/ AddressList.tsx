import React from "react";
import { AddressType } from "../../types/address";

import { useRecoilState } from "recoil";
import { centerCoordinateState } from "../../atoms/data";


interface AddressListProps {
  data: AddressType[];
}

const AddressList: React.FC<AddressListProps> = ({ data }) => {

  const [centerCoordinate, setCenterCoordinate] = useRecoilState(centerCoordinateState);

  const handleAddressClick = (e: React.MouseEvent<HTMLButtonElement>, address: AddressType) => {
      e.preventDefault();
      setCenterCoordinate({
          x: address.x,
          y: address.y
      })
  }

  return (
    <>
      {data.map((address, index) => (
        <div key={`${address.address_name}_${index}`} className={`min-w-[25vw] text-sm p-3 flex justify-between ${data.length === index + 1 ? '' : 'border-b border-gray-400'} `}>
          <span>{address.address_name}</span>
          <button className="px-5 ml-2 text-xs text-white bg-gray-500 rounded-md" onClick={(e) => handleAddressClick(e, address)}>
            이동
          </button>
        </div>
      ))}
    </>
  );
};

export default AddressList;
