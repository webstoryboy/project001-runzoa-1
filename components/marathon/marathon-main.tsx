"use client";

import { useState } from "react";

import MarathonTitle from "./marathon-title";
import MarathonFilter from "./marathon-filter";
import MarathonMonthBar from "./marathon-month-bar";
import MarathonNotice from "./marathon-notice";
import MarathonSearchBar from "./marathon-search-bar";
import MarathonListCard from "./marathon-list-card";
import MarathonListTable from "./marathon-list-table";
import MarathonListCalendar from "./marathon-list-calendar";

export type ViewType = "card" | "table" | "calendar";

export default function MarathonMain() {
  const [view, setView] = useState<ViewType>("card");

  return (
    <>
      <MarathonTitle />
      <MarathonFilter />
      <MarathonNotice />
      <MarathonSearchBar view={view} onViewChange={setView} />
      <MarathonMonthBar />
      {view === "card" && <MarathonListCard />}
      {view === "table" && <MarathonListTable />}
      {view === "calendar" && <MarathonListCalendar />}
    </>
  );
}
