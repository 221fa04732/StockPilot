import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    return (<div className="w-full flex justify-center items-center text-white bg-slate-950 pt-20 pb-28" >
            <Accordion
            type="single"
            collapsible
            className="w-10/12 md:w-8/12"
            defaultValue="0">
            {FAQlist.map((item, index)=>(
                <AccordionItem value={index.toString()} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>{item.answer}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>)
}

type faqTypes = {
    question : string,
    answer : string
}

const FAQlist: faqTypes[] = [{
    question: "What does Vulcan Technologies do?",
    answer: "Vulcan leverages AI and legal expertise to offer intelligent tools for automatic regulatory drafting and compliance reporting, helping both government agencies and private firms navigate complex legal landscapes."
}, {
    question: "What is Intelligent Legal Cartography?",
    answer: "It's Vulcan's proprietary system that uses AI-generated vector embeddings to map relationships between laws, regulations, and case law, enabling automatic analysis, drafting, and compliance."
}, {
    question: "Who uses Vulcan's services?",
    answer: "Vulcan serves two main audiences: government agencies needing automatic regulatory drafting tools, and businesses requiring compliance analysis and automated public comment submissions."
}, {
    question: "How does Vulcan help reduce regulatory burdens?",
    answer: "By automatically identifying outdated or redundant rules and suggesting compliant revisions, Vulcan helps agencies deregulate without legal risk, and assists businesses in requesting regulatory carve-outs."
}, {
    question: "Can Vulcan generate bills for specific states?",
    answer: "Yes, Vulcan’s bill generation software can create or reformat legislation tailored to specific state or federal codes, ensuring accuracy in format, references, and legal structure."
}];
