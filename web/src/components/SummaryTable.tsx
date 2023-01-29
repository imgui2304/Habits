import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generete-dates-from-year-beginning";
import HabitDay from "./HabitDay";

// import { Container } from './styles';
const weekDay = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDate = generateDatesFromYearBeginning();

const minumumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minumumSummaryDatesSize - summaryDate.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const SummaryTable: React.FC = () => {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((res) => {
      setSummary(res.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDay.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 && summaryDate.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });
          return (
            <HabitDay
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
              date={date}
              key={date.toString()}
            />
          );
        })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="opacity-40 cursor-not-allowed w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
};

export default SummaryTable;
