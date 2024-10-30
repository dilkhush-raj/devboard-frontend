"use client";
import {AuroraHero} from "@/components/ui/Hero";
import {useEffect} from "react";

const page = () => {
  useEffect(() => {
    document.cookie = "visited=true";
  }, []);
  return <AuroraHero />;
};

export default page;
