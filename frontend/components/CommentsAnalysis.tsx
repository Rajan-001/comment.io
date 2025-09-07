

import React, { useState } from "react";

export const CommentsAnalysis = ({ positiveCommentList,suggestionList,negativeCommentList}:{ positiveCommentList:any,suggestionList:any,negativeCommentList:any}) => {
  const [activeTab, setActiveTab] = useState("positive");

  const renderComments = () => {
    let currentList = [];
    if (activeTab === "positive") currentList = positiveCommentList;
    if (activeTab === "suggestion") currentList = suggestionList;
    if (activeTab === "negative") currentList = negativeCommentList;

    return currentList.map((item:any, index:number) => (
      <div
        key={index}
        className="flex items-start gap-3 p-3 border-b backdrop-blur-3xl last:border-none bg-slate-200 rounded-2xl shadow-sm scroll-auto "
      >
        {/* Profile Picture */}
        <img
          src={item.profilePic}
          alt={item.username}
          className="w-10 h-10 rounded-full"
        />

        {/* Comment Details */}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{item.username}</span>
          <p className="text-gray-700">{item.comment}</p>

          {/* Show suggestion only if exists */}
          {item.suggestion && (
            <p className="text-blue-600 text-sm mt-1">
              💡 Suggestion: {item.suggestion}
            </p>
          )}

          {/* Likes */}
          <span className="text-xs text-gray-500 mt-1">👍 {item.likes} likes</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-[60vw] mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 bg-slate-100 backdrop-blur-3xl  p-3 rounded-2xl mb-4">
        <button
          className={`px-4 py-2  cursor-pointer  rounded-3xl ${
            activeTab === "positive" ? "bg-green-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("positive")}
        >
          Positive
        </button>
        <button
          className={`px-4 py-2 rounded-3xl cursor-pointer ${
            activeTab === "suggestion" ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("suggestion")}
        >
          Suggestions
        </button>
        <button
          className={`px-4 py-2 rounded-3xl cursor-pointer ${
            activeTab === "negative" ? "bg-red-500 text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab("negative")}
        >
          Negative
        </button>
      </div>

      {/* Comments Display */}
      <div className="space-y-3 h-[500px] overflow-y-auto  pr-2">{renderComments()}</div>
    </div>
  );
};
