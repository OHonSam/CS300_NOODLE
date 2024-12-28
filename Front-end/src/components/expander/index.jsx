import React from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const Expander = ({ title, content, url, isOpened }) => {
  const [open, setOpen] = React.useState(isOpened ? 1 : 0)

  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(1)}>
        {title}
      </AccordionHeader>
      <AccordionBody>
        {content}
        {url && (
          <p>
            Click{" "}
            <a href={url} rel="noreferrer" className="text-blue-500 hover:underline">
              {url}
            </a>{" "}
            link to open resource.
          </p>
        )}
      </AccordionBody>
    </Accordion >
  );
}

export default Expander;
