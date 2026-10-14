import { FaqItem } from "@/features/pitch/sections/FaqSection/components/FaqItem";

const faqs = [
  {
    number: "1",
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    number: "2",
    question: "Duis aute irure dolor in reprehenderit in voluptate velit esse?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    number: "3",
    question: "Excepteur sint occaecat cupidatat non proident sunt in culpa?",
    answer:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    number: "4",
    question: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  },
  {
    number: "5",
    question: "Ut enim ad minima veniam, quis nostrum exercitationem ullam?",
    answer:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
  },
  {
    number: "6",
    question: "Quis autem vel eum iure reprehenderit qui in ea voluptate?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  },
  {
    number: "7",
    question: "Nam libero tempore, cum soluta nobis est eligendi optio cumque?",
    answer:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    number: "8",
    question: "Temporibus autem quibusdam et aut officiis debitis aut rerum?",
    answer:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  },
];

export const FaqList = () => {
  return (
    <div
      role="region"
      aria-label="Frequently Asked Questions"
      className="border-t border-[#2F5527]/25 flex flex-col w-full"
    >
      {faqs.map((faq) => (
        <FaqItem
          key={faq.number}
          number={faq.number}
          question={faq.question}
          answer={faq.answer}
          defaultOpen={faq.number === "1"}
        />
      ))}
    </div>
  );
};