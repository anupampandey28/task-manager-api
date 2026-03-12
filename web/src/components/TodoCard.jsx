import { useState } from "react";
import dayjs from "dayjs";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import confetti from "canvas-confetti";

const TodoCard = ({ onSuccess }) => {

  const getNow = () => dayjs();

  const [taskname,setTaskname] = useState("");
  const [priority,setPriority] = useState("");

  const [date,setDate] = useState(dayjs);
  const [startTime,setStartTime] = useState(dayjs());
  const [duration,setDuration] = useState("");

  const [error,setError] = useState("");
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);

  // -------- TIME RESTRICTION LOGIC --------

  const today = dayjs().startOf("day");

  const isToday =
    date && dayjs(date).isSame(today,"day");

  const minSelectableTime = isToday ? dayjs() : null;

  // ---------------------------------------

  const resetForm = () => {

    setTaskname("");
    setPriority("");

    setDate(null);
    setStartTime(getNow());
    setDuration("");

    setError("");
    setIsSubmitting(false);
    setIsSuccess(false);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if(!taskname.trim()){
      setError("Task name is required.");
      return;
    }

    if(!priority){
      setError("Please select priority.");
      return;
    }

    if(!date){
      setError("Please select date.");
      return;
    }

    if(!duration){
      setError("Please enter duration.");
      return;
    }

    const endTime = startTime.add(Number(duration),"minute");

    setIsSubmitting(true);

    const newTodo = {

      name:taskname.trim(),
      priority,
      date:date.format("YYYY-MM-DD"),
      start_time:startTime.format("HH:mm:ss"),
      end_time:endTime.format("HH:mm:ss")

    };

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`,{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(newTodo)
      });

      if(!res.ok){

        const data = await res.json();
        setError(data.error);
        setIsSubmitting(false);
        return;

      }

      setIsSuccess(true);

      confetti({
        particleCount:80,
        spread:60,
        origin:{y:0.6}
      });

      setTimeout(()=>{

        resetForm();
        if(onSuccess) onSuccess();

      },1200);

    } catch {

      setError("Something went wrong.");
      setIsSubmitting(false);

    }

  };

  return (

    <div className="relative min-w-60 bg-white rounded-2xl border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-8">

      {isSuccess && (

        <div className="absolute inset-0 bg-white rounded-2xl flex flex-col items-center justify-center z-50">

          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-md">

            <svg viewBox="0 0 52 52" className="w-10 h-10">
              <path
                fill="none"
                stroke="white"
                strokeWidth="5"
                d="M14 27 l7 7 l16 -16"
              />
            </svg>

          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-800">
            Scheduled Successfully
          </h2>

        </div>

      )}

      {/* Header */}

      <div className="mb-8 w-60">

        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Schedule Task
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Organize your time efficiently
        </p>

      </div>

      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Task Name */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Name
          </label>

          <input
            type="text"
            value={taskname}
            onChange={(e)=>setTaskname(e.target.value)}
            placeholder="Design backend API"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          />

        </div>

        {/* Priority */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-3">
            Priority
          </label>

          <div className="flex gap-3">

            {["high","medium","low"].map(level => (

              <button
                key={level}
                type="button"
                onClick={()=>setPriority(level)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
                  priority === level
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >

                {level.charAt(0).toUpperCase()+level.slice(1)}

              </button>

            ))}

          </div>

        </div>

        {/* Date Picker */}

        <DatePicker
          label="Start Date"
          value={date}
          onChange={setDate}
        />

        {/* Time Picker */}

        <TimePicker
          value={startTime}
          onChange={setStartTime}
          minTime={minSelectableTime}
        />

        {/* Duration */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>

          <input
            type="number"
            value={duration}
            onChange={(e)=>setDuration(e.target.value)}
            placeholder="30"
            className="w-full px-4 py-3 rounded-xl border border-gray-300"
          />

        </div>

        {/* Error */}

        <div className="min-h-5 text-sm text-red-500">
          {error}
        </div>

        {/* Button */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 py-3 rounded-xl bg-orange-500 text-white font-medium shadow-sm hover:bg-orange-600 hover:shadow-md transition disabled:opacity-60"
        >

          {isSubmitting ? "Scheduling..." : "Schedule Task"}

        </button>

      </form>

    </div>

  );

};

export default TodoCard;