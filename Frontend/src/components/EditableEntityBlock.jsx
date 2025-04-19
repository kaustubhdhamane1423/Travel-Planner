import React,{ useState } from "react";

const EditableEntityBlock = () => {
  const [text, setText] = useState("Add your notes or custom plans here...");

  return (
    <div className="p-3 mt-4 border bg-white rounded shadow">
      <label className="block text-sm font-medium mb-1">Notes</label>
      <textarea
        className="w-full p-2 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
    </div>
  );
};

export default EditableEntityBlock;
