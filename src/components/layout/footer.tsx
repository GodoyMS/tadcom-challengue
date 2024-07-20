import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className=" w-full px-6 py-2 bg-primary-foreground flex justify-end items-center gap-2">
      <div className=" font-semibold text-slate-500">Hecho por</div>
      <Button asChild>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/godoy-liam-solorzano/"
        >
          Godoy Muñoz
          <GitHubLogoIcon className="ml-3" />
        </a>
      </Button>
    </div>
  );
};

export default Footer;
