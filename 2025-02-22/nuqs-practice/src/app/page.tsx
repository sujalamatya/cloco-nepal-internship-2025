"use client";
import { useQueryState } from "nuqs";

export default function Home() {
  const [name, setName] = useQueryState("name");

  return (
    <div className="flex items-center justify-center flex-col p-3 m-3 h-screen w-full">
      <h1>hello {name}</h1>
      <input
        type="text"
        className="text-black"
        onChange={({ target }) => setName(target.value)}
      />
      <p className=" m-5">
        Please go to{" "}
        <a
          href={`http://localhost:3000/?name=${name}`}
          target="_blank"
          className="text-blue-500 underline"
        >
          http://localhost:3000/?name={name}
        </a>
      </p>
      <p className="opacity-50">To check if the state is managed in the URL</p>
    </div>
  );
}
