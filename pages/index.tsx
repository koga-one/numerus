import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  createRef,
  KeyboardEvent,
  RefObject,
  useEffect,
  useState,
} from "react";
import { Block, Layout } from "../components";
import { IsEven } from "../components/Widgets";

const Home: NextPage = () => {
  const [n, setN] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const router = useRouter();
  const numberEl: RefObject<HTMLInputElement> = createRef();
  const minEl: RefObject<HTMLInputElement> = createRef();
  const maxEl: RefObject<HTMLInputElement> = createRef();

  const randomNumber = () => {
    if (minEl.current && maxEl.current) {
      const minVal = parseInt(minEl.current.value);
      const maxVal = parseInt(maxEl.current.value);
      const number = Math.round(Math.random() * (maxVal - minVal) + minVal);

      if (isNaN(number))
        router.push(`/?number=0`, undefined, { shallow: true });
      else
        router.push(
          `/?number=${number}&min=${minVal}&max=${maxVal}`,
          undefined,
          { shallow: true }
        );
    }
  };

  const handleNumber = () => {
    const number = parseInt(numberEl.current!.value);

    if (isNaN(number)) router.push(`/?number=0`, undefined, { shallow: true });
    else router.push(`/?number=${number}`, undefined, { shallow: true });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNumber();
    }
  };

  useEffect(() => {
    if (typeof router.query.number === "string") {
      setN(parseInt(router.query.number));
      numberEl.current!.value = n.toString();
    } else {
      numberEl.current!.value = "0";
      minEl.current!.value = "";
      maxEl.current!.value = "";
      setN(0);
    }
    if (
      typeof router.query.min === "string" &&
      typeof router.query.max === "string"
    ) {
      setMin(parseInt(router.query.min));
      setMax(parseInt(router.query.max));
      minEl.current!.value = min.toString();
      maxEl.current!.value = max.toString();
    }
  }, [handleNumber]);

  return (
    <Layout title="HOME">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto px-1 gap-4">
        <Block title="Primes" version={0.1} answers={[IsEven]} n={n} />
      </div>
      <nav className="grid grid-cols-1 lg:grid-cols-6 bottom-1 lg:bottom-8 h-48 lg:h-16 sticky px-1 lg:px-40 my-4 lg:my-16 pointer-events-none z-50 mx-auto container gap-1">
        <div className="grid gap-1 grid-cols-2 lg:grid-cols-5 lg:col-span-5 bg-kami rounded-md border-2">
          <input
            ref={minEl}
            type="number"
            step="1"
            className="pointer-events-auto lg:col-span-2 px-4 py-1 border-katsu dark:border-kami dark:bg-katsu placeholder:italic placeholder:text-gure rounded-md bg-kami"
            placeholder="Minimum"
          ></input>
          <input
            ref={maxEl}
            type="number"
            step="1"
            className="pointer-events-auto lg:col-span-2 px-4 py-1 border-katsu dark:border-kami dark:bg-katsu placeholder:italic placeholder:text-gure rounded-md bg-kami"
            placeholder="Maximum"
          ></input>{" "}
          <button
            type="button"
            onClick={randomNumber}
            className="active:bg-ki col-span-2 lg:col-span-1 border-2 dark:border-kami transition border-katsu pointer-events-auto rounded-md bg-kami text-katsu italic px-4 py-1"
          >
            <p>Random</p>
          </button>
        </div>
        <button
          type="button"
          onClick={handleNumber}
          className="border-2 order-1 lg:order-none row-span-2 active:bg-ki transition border-katsu dark:border-kami pointer-events-auto rounded-md text-xl lg:text-2xl bg-kami text-katsu italic px-4 py-1"
        >
          <p>Enter</p>
        </button>
        <input
          ref={numberEl}
          type="number"
          step="1"
          className="pointer-events-auto lg:text-2xl lg:col-span-5 text-xl w-full px-4 py-1 border-2 border-katsu dark:border-ki dark:bg-katsu placeholder:italic placeholder:text-gure rounded-md bg-kami"
          placeholder="Enter a number..."
          onKeyDown={handleKeyDown}
        ></input>
      </nav>
    </Layout>
  );
};

export default Home;
