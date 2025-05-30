'use client';

import { useState } from "react";
import { downloadCsv, CsvColumn } from "@/lib/csv";
import {Club} from "@/lib/objects";
import { readRoster } from '@/lib/firebaseClient';
import { Roster } from '@/lib/objects';

const columns: CsvColumn<Roster>[] = [
  {
    key: "id",
    title: "Student ID#",
    formatValue: ( value: number ) => {
      return value.toString()
    }
  },
  {
    key: "lastName",
    title: "Student Name (Last)"
  },
  {
    key: "firstName",
    title: "Student Name (First)"
  },
  {
    key: "club",
    title: "Name of Club",
  }
];

export default function DownloadButton() {
  const [ isProcessing, setIsProcessing ] = useState( false );

  const onClickDownload = async () => {
    setIsProcessing( true );

    const data: Roster[] = await readRoster();

    downloadCsv( data, columns, "Club_Student_Data" );

    setIsProcessing( false );
  };

  return (
    <>
      <button
        className={"p-2 flex items-center justify-center h-[7vh] text-lg !text-[var(--fssgold)] rounded-md select-text" +
          "transform transition-transform duration-200 hover:scale-102 cursor-pointer border border-1 border-[var(--fssgold)]"}
        type="button"
        onClick={onClickDownload}
        disabled={isProcessing}
      >
        {isProcessing ? (
          "Please wait..."
        ) : (
          "Download data as CSV"
        )}
      </button>
    </>
  )
}