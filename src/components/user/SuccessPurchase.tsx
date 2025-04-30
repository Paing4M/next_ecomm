'use client'

import {CheckCircle} from "lucide-react";
import Link from "next/link";
import SuccessConfetti from "@/components/SuccessConfetti";
import {useRouter, useSearchParams} from "next/navigation";
import {useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import useCartStore from "@/hooks/useCartStore";

const SuccessPurchase = () => {
  const {clearCart} = useCartStore()

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || null;
  const {user} = useUser();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const postPurchaseSuccess = async () => {
      if (!sessionId || !user) return;
      try {
        const res = await fetch('/api/purchase-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            userEmail: user.emailAddresses[0].emailAddress,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to record purchase');
        }

        setIsSuccess(true);
      } catch (e: any) {
        console.error('Error posting purchase success:', e);
        toast.error(e.message || 'Something went wrong');
        setIsSuccess(false);
      }
    };

    postPurchaseSuccess();
  }, [sessionId, user]);

  useEffect(() => {
    if (isSuccess) {
      clearCart()
    }
  }, [isSuccess]);

  if (isSuccess === null) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Validating your purchase...</p>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Something went wrong. Please try again later.</p>
        <Link href={'/'} className='underline'>Go to Home Page</Link>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[500px] text-center space-y-4 border  bg-redBackground">
      <SuccessConfetti/>
      <CheckCircle className="mx-auto w-16 h-16"/>
      <h3 className="text-2xl font-bold">Purchase Successful!</h3>
      <p className="text-gray-600">
        Thank you for your order. We’ve emailed you the receipt and will notify you when your items are on the way.
      </p>
      <Link
        href="/products"
        className="mt-4 px-4 py-2 rounded-lg text-white bg-redBackground transition inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default SuccessPurchase;
