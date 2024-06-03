"use client";
import Answer from "@/components/shared/Answer";
import {useState, useEffect} from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/answers.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {data.map((ans) => (
        <Answer key={ans.id} data={ans} />
      ))}
    </div>
  );
}
