import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Home',
};

const HomeLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <>{children}</>
  )
}

export default HomeLayout
