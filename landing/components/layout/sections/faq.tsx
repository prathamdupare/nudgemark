import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Will this extension be open source?",
    answer:
      "Yes, I plan to release the entire project, including the extension, as open source once it's ready. You’ll be able to access, contribute, and customize the code after the launch.",
    value: "item-1",
  },
  {
    question: "How can I get started with the extension once it's launched?",
    answer:
      "Once launched, you’ll be able to install the extension directly from the browser extension store or my GitHub repository. I'll provide detailed instructions to help you get set up.",
    value: "item-2",
  },
  {
    question: "Can I customize the AI reminders in the extension?",
    answer:
      "Yes! I’m working on making the AI reminders customizable to fit different needs. Once the extension is live, you'll be able to adjust them according to your preferences.",
    value: "item-3",
  },
  {
    question: "Will there be a mobile version of the extension?",
    answer: "Currently, the extension will be browser-based",
    value: "item-4",
  },
  {
    question: "How can I contribute to the project once it's open source?",
    answer:
      "I’m excited for you to contribute once the project is open source! After launch, you’ll be able to check out the repository on GitHub, report bugs, or submit pull requests. I welcome contributions and feedback.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
