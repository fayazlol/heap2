"use client";
import { useState, useEffect } from 'react';
import HeartIconOutline from '@/components/HeartIconOutline';
import HeartIconSolid from '@/components/HeartIconSolid';

interface LikeIconProps {
  productId: string;
  username: string;
  initialLiked?: boolean;
}

const ToggleLikeButton: React.FC<LikeIconProps> = ({ productId, username, initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialLikedStatus = async () => {
      try {
        const response = await fetch(`/api/addfavourites?productId=${productId}&username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch initial like status');
        }
        const data = await response.json();
        setLiked(data.liked);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLikedStatus();
  }, [productId, username]);

  const handleToggle = async () => {
    try {
      const response = await fetch(`/api/addfavourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, username }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like status');
      }

      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <button aria-label="Like" disabled>Loading...</button>;
  }

  return (
    <button aria-label="Like" onClick={handleToggle}>
      {liked ? <HeartIconSolid /> : <HeartIconOutline />}
    </button>
  );
};

export default ToggleLikeButton;
