"use client";
import { Button } from "@nextui-org/react";
import React from 'react';
import { useRouter } from 'next/navigation';

interface DeleteListingButtonProps {
  productId: string;
}

const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({ productId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/productlisting?id=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the listing');
      }

      alert('Listing deleted successfully');
      router.refresh(); // Refresh the page to update the listings
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Button
      color="primary"
      variant="solid"
      className="text-white"
      style={{ padding: '5px 10px', fontSize: '12px' }}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
};

export default DeleteListingButton;