import { useState } from "react";
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

const Expander = ({ title, content, url, isOpened, canEdit = true }) => {
  const [localTitle, setTitle] = useState(title)
  const [localContent, setContent] = useState(content)
  const [localUrl, setUrl] = useState(url)
  const [open, setOpen] = useState(isOpened ? 1 : 0)
  const [isEditing, setIsEditing] = useState(false)

  const checkValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  const handleOpen = (value) => {
    if (isEditing) {
      return;
    }

    setOpen(value === open ? 0 : value);
  }

  const handleEditButton = () => {
    if (!isEditing) {
      setOpen(1);
      setIsEditing(true);
    } else {
      if (localUrl && !checkValidUrl(localUrl)) {
        alert("Invalid URL, please enter a valid URL");
        return;
      }

      setIsEditing(false);
    }
  }

  const handleDeleteButton = () => {
    window.confirm("Are you sure you want to delete this material?")
  }

  return (
    <div className="border rounded-lg shadow-md bg-white w-full flex items-center pl-4 pr-2">
      <div className="flex-grow">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            {isEditing ? (
              <div className="w-full">
                <label for="title" class="block mb-2 text-sm font-bold text-black">Title</label>
                <input type="text" id="title" class="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Material title" value={localTitle} onChange={(e) => setTitle(e.target.value)} />
              </div>
            ) : (
              <p>{localTitle}</p>
            )}
          </AccordionHeader>
          <AccordionBody>
            {isEditing ? (
              <div className="w-full">
                <label for="content" class="block mb-2 text-sm font-medium text-black">Description</label>
                <textarea type="text" id="content" class="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Material description" value={localContent} onChange={(e) => setContent(e.target.value)} />
              </div>
            ) : (
              <p>{localContent}</p>
            )}
            {isEditing ? (
              <div className="w-full">
                <hr className="my-4" />
                <label for="url" class="block mb-2 text-sm font-medium text-black">URL</label>
                <input type="text" id="url" class="border border-gray-300 text-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" placeholder="Material URL" value={localUrl} onChange={(e) => setUrl(e.target.value)} />
              </div>
            ) : (
              (localUrl && (
                <div>
                  <hr className="my-3" />
                  <p>
                    Click{" "}
                    <a href={localUrl} rel="noreferrer" className="text-blue-500 hover:underline pt-2">
                      {localUrl}
                    </a>{" "}
                    to open material
                  </p>
                </div>
              ))
            )}
          </AccordionBody>
        </Accordion >
      </div>
      {
        canEdit ? (
          <div>
            <div className="border-r h-full ml-4" />
            <button
              onClick={handleEditButton}
              className="p-2 flex-shrink-0"
            >
              {!isEditing ? "✏️" : "✔️"}
            </button>
            <button
              onClick={handleDeleteButton}
              className="p-2 flex-shrink-0"
            >
              {"❌"}
            </button>
          </div>
        ) : (
          <div className="mr-2" />
        )
      }
    </div >
  );
}

export default Expander;
