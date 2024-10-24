import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

export default function Contact() {
  const { portofolioData } = useSelector((state) => state.root);
  const { contact } = portofolioData;

  return (
    <div>
      <SectionTitle title="Say Hello!" />
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-1/2 ">
          <h1 className="text-tertiary text-sm">{"{"}</h1>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" && (
                <p key={key} className="ml-5 text-sm">
                  <span className="text-tertiary text-sm">{key} :</span>

                  <span className="text-tertiary px-2">
                    {contact[key] !== null ? contact[key] : "N/A"}
                  </span>
                </p>
              )
          )}
          <p className="text-tertiary text-sm">{"}"}</p>
        </div>
        <div className="w-1/2">
          <img
            src="https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg"
            className="h-56"
          />
        </div>
      </div>
    </div>
  );
}
