"use client";
import React, { Suspense } from "react";
import ClientResults from "./ClientResults";

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientResults />
    </Suspense>
  );
}
