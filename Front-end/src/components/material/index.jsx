import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const Material = ({ materialId, title, content, url, isOpened, onUpdate, onDelete, canEdit = true }) => {
  const [localTitle, setTitle] = useState(title);
  const [localContent, setContent] = useState(content);
  const [localUrl, setUrl] = useState(url);
  const [open, setOpen] = useState(isOpened ? 1 : 0);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkValidUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleOpen = (value) => {
    if (isEditing || isLoading) return;
    setOpen(value === open ? 0 : value);
  };

  const handleEditButton = async () => {
    if (!isEditing) {
      setOpen(1);
      setIsEditing(true);
      return;
    }

    if (!localTitle || !localContent) {
      alert("Title and description are required");
      return;
    }

    if (localUrl && !checkValidUrl(localUrl)) {
      alert("Invalid URL, please enter a valid URL");
      return;
    }

    setIsLoading(true);
    const success = await onUpdate({
      title: localTitle,
      content: localContent,
      url: localUrl
    });

    if (success) {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  const handleDeleteButton = async () => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    setIsLoading(true);
    await onDelete();
    setIsLoading(false);
  };

  return (
    <div className="border rounded-lg shadow-md hover:bg-gray-100 bg-white w-full flex pl-4 pr-2">
      <div className="flex-grow">
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            <div className="flex items-center w-full">
              {isEditing ? (
                <div className="w-full">
                  <label htmlFor="title" className="block mb-2 text-sm font-bold text-black">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                    placeholder="Material title"
                    value={localTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <p>{localTitle}</p>
              )}
            </div>
          </AccordionHeader>
          <AccordionBody>
            {isEditing ? (
              <div className="w-full">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  id="content"
                  className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Material description"
                  value={localContent}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <p>{localContent}</p>
            )}
            {isEditing ? (
              <div className="w-full">
                <hr className="my-4" />
                <label htmlFor="url" className="block mb-2 text-sm font-medium text-black">
                  URL
                </label>
                <input
                  type="text"
                  id="url"
                  className="border border-gray-300 text-blue-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                  placeholder="Material URL"
                  value={localUrl}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            ) : (
              localUrl && (
                <div>
                  <hr className="my-3" />
                  <p>
                    Click{" "}
                    <a href={localUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline pt-2">
                      this link
                    </a>{" "}
                    to open material
                  </p>
                </div>
              )
            )}
          </AccordionBody>
        </Accordion>
      </div>
      {canEdit ? (
        <div className="pt-2 pl-2 flex-shrink-0">
          <button
            onClick={handleEditButton}
            className="p-2"
            disabled={isLoading}
          >
            {isLoading ? "⏳" : !isEditing ? "✏️" : "✔️"}
          </button>
          <button
            onClick={handleDeleteButton}
            className="p-2"
            disabled={isLoading}
          >
            {isLoading ? "⏳" : "❌"}
          </button>
        </div>
      ) : (
        <div className="pr-2" />
      )}
    </div>
  );
};

export default Material;
