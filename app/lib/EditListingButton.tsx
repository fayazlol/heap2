"use client";
import { Button } from "@nextui-org/react";
import Link from 'next/link';
import React from 'react';

interface EditListingButtonProps {
  productId: string;
}

const EditListingButton: React.FC<EditListingButtonProps> = ({ productId }) => {
  return (
    <Link href={`../userprofile/editlisting/${productId}`}>
      <Button
        color="primary"
        variant="solid"
        className="text-white"
        size="sm"
        radius="full"
      >
        Edit
      </Button>
    </Link>
  );
};

export default EditListingButton;

