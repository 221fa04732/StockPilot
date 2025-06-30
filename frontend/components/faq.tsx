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
    question: "What does the Inventory Management System do?",
    answer: "It helps businesses efficiently track, manage, and organize their stock levels, orders, sales, and deliveries in real-time."
}, {
    question: "Can I track inventory across multiple locations?",
    answer: "Yes, the system supports multi-location inventory tracking, allowing you to monitor stock levels at different warehouses or stores from a single dashboard."
}, {
    question: "Does the system support low stock alerts?",
    answer: "Absolutely. You can set minimum stock thresholds, and the system will automatically alert you when items run low."
}, {
    question: "Can I manage a list of suppliers with associated products?",
    answer: "Yes, the system lets you maintain a comprehensive list of suppliers along with the products they provide, making reordering and supplier tracking seamless."
}, {
    question: "Is there a record of all past transactions?",
    answer: "Yes, the system keeps a detailed history of all stock movements, purchases, sales, and adjustments, providing complete traceability and audit-ready logs."
}];
