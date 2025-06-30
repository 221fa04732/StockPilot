import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function ServiceCard() {
  const data = [{
        title: "/bill.png",
        content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-4xl lg:xl font-bold text-neutral-600">Automatic Deregulation</div>
          <div className="text-white md:text-lg text-sm">Vulcan maps all state and federal laws, regulations, and guidance documents, enabling automatic reduction of regulatory burdens. We decipher relationships between regulations and laws, ensuring compliance with legal requirements while meeting agency demands. Trust Vulcan Consulting to rewrite regulations effectively, prioritizing necessary provisions and eliminating outdated complexities.</div>
        </div>
        ),
        navigateURL : "https://www.vulcan-tech.com/deregulation"
    },{
        title: "/deregulation.png",
        content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-4xl lg:xl font-bold text-neutral-600">Automatic Bill Writing</div>
          <div className="text-white md:text-lg text-sm">Vulcan offers an efficient and legally compliant bill generation software that aligns with state and federal codes. Our AI enables users to effortlessly generate bill drafts without worrying about formatting, definitions, or identifying the right sections to amend. Whether users need to draft a novel bill or reformat an existing model within a specific state code, Vulcan provides a seamless solution.</div>
        </div>
        ),
        navigateURL : "https://www.vulcan-tech.com/billdrafting"
    },{
      title: "/compliance.png",
      content: (
        <div className="flex flex-col items-start justify-center gap-4">
          <div className="text-4xl lg:xl font-bold text-neutral-600">Business Compliance</div>
          <div className="text-white md:text-lg text-sm">Vulcan maps all state and federal laws, regulations, and guidance documents, enabling automatic reduction of regulatory burdens. We decipher relationships between regulations and laws, ensuring compliance with legal requirements while meeting agency demands. Trust Vulcan Consulting to rewrite regulations effectively, prioritizing necessary provisions and eliminating outdated complexities.</div>
        </div>
      ),
      navigateURL : "https://www.vulcan-tech.com/businesschecker"
    },
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
