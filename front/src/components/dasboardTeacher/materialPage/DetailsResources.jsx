import React from "react";
import FilterComponent from "./Filter";
import Sidebar from "../../../assestComponent/Sidebar";
import QuizPlatform from "./QuizResources/QuizPlatform";
import Header from "./Header";

const DetailsResources = () => {
  return (
    <div className="bg-[#F2F2F2] min-h-screen ">
      {/* <div className="max-w-[100%] mx-auto ">
        <Header />
      </div> */}

      <div className="flex max-w-[95%] mx-auto">
        <aside className="w-20 flex-shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-0 p-4 lg:p-">
           
            <div className="md:col-span-7 max-h-screen overflow-auto rounded-md ">
              <QuizPlatform />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsResources;