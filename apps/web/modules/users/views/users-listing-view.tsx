"use client";

import NoSSR from "@coachos/lib/components/NoSSR";
import { UsersTable } from "../components/UsersTable";

export default function UsersListingView() {
  return (
    <NoSSR>
      <UsersTable />
    </NoSSR>
  );
}
