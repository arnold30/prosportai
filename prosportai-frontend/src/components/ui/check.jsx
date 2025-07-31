
import React from "react";
import { Check as CheckIcon } from "lucide-react";

const Check = ({ className, ...props }) => {
  return <CheckIcon className={className} {...props} />;
};

export { Check };
