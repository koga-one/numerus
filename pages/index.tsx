import type { NextPage } from "next";
import { useRouter } from "next/router";
import { createRef, KeyboardEvent, RefObject, useEffect } from "react";
import { Block, Layout } from "../components";
import {
  Conversion,
  Digits,
  Factorization,
  Remainders,
  Transformations,
  Operations,
  Geometry,
  DumbUnits,
} from "../components/widgets";

const Home: NextPage = () => {
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

    if (minEl.current && maxEl.current) {
      const minVal = parseInt(minEl.current.value);
      const maxVal = parseInt(maxEl.current.value);

      if (isNaN(number))
        router.push(`/?number=0&min=${minVal}&max=${maxVal}`, undefined, {
          shallow: true,
        });
      else
        router.push(
          `/?number=${number}&min=${minVal}&max=${maxVal}`,
          undefined,
          {
            shallow: true,
          }
        );
    } else {
      if (isNaN(number))
        router.push(`/?number=0&min=0&max=1000`, undefined, {
          shallow: true,
        });
      else
        router.push(`/?number=${number}&min=0&max=1000`, undefined, {
          shallow: true,
        });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNumber();
    }
  };

  useEffect(() => {
    if (numberEl.current && typeof router.query.number === "string") {
      numberEl.current.value = router.query.number;
    }
    if (minEl.current && typeof router.query.min === "string") {
      minEl.current.value = router.query.min;
    }
    if (maxEl.current && typeof router.query.max === "string") {
      maxEl.current.value = router.query.max;
    }
  }, [
    minEl,
    maxEl,
    numberEl,
    minEl.current?.value,
    maxEl.current?.value,
    numberEl.current?.value,
    router.query.max,
    router.query.min,
    router.query.number,
  ]);

  return (
    <Layout title="HOME">
      <div className="container mx-auto grid auto-rows-[2rem] grid-cols-1 gap-4 px-1 md:grid-cols-2 lg:grid-cols-3">
        <Block
          title="Quick Operations"
          version={0.1}
          rows={10}
          func={Operations}
          n={Number(router.query.number)}
        />
        <Block
          title="Factorization"
          version={0.2}
          rows={6}
          func={Factorization}
          n={Number(router.query.number)}
        />
        <Block
          title="Conversion"
          version={0.1}
          rows={8}
          func={Conversion}
          n={Number(router.query.number)}
        />
        <Block
          title="Digits"
          version={0.1}
          rows={6}
          func={Digits}
          n={Number(router.query.number)}
        />
        <Block
          title="Dumb Units"
          version={0.1}
          rows={18}
          func={DumbUnits}
          n={Number(router.query.number)}
        />
        <Block
          title="Remainders"
          version={0.1}
          rows={8}
          func={Remainders}
          n={Number(router.query.number)}
        />
        <Block
          title="Geometry"
          version={0.1}
          rows={7}
          func={Geometry}
          n={Number(router.query.number)}
        />
        <Block
          title="Transformations"
          version={0.2}
          rows={5}
          func={Transformations}
          n={Number(router.query.number)}
        />
      </div>
      <nav className="container pointer-events-none sticky bottom-1 z-50 my-4 mx-auto grid h-40 grid-cols-1 gap-1 px-1 lg:bottom-8 lg:my-16 lg:h-16 lg:grid-cols-6 lg:px-40">
        <div className="grid grid-cols-2 gap-0.5 rounded-md border-2 border-gure bg-gure dark:border-kami dark:bg-kami lg:col-span-5 lg:grid-cols-5">
          <input
            ref={minEl}
            type="number"
            step="1"
            className="pointer-events-auto rounded-md border-gure bg-kami px-4 py-1 text-sm placeholder:italic placeholder:text-gure dark:border-kami dark:bg-katsu lg:col-span-2 lg:text-base"
            placeholder="Minimum"
          ></input>
          <input
            ref={maxEl}
            type="number"
            step="1"
            className="pointer-events-auto rounded-md border-gure bg-kami px-4 py-1 text-sm placeholder:italic placeholder:text-gure dark:border-kami dark:bg-katsu lg:col-span-2 lg:text-base"
            placeholder="Maximum"
          ></input>{" "}
          <button
            type="button"
            onClick={randomNumber}
            className="pointer-events-auto col-span-2 rounded-md bg-gure px-4 py-1 text-sm italic text-kami transition active:bg-ki lg:col-span-1 lg:text-base"
          >
            <p>Random</p>
          </button>
        </div>
        <button
          type="button"
          onClick={handleNumber}
          className="pointer-events-auto order-1 row-span-2 rounded-md border-2 border-gure bg-gure px-4 py-1 italic text-kami transition active:bg-ki dark:border-kami lg:order-none lg:text-2xl"
        >
          <p>Enter</p>
        </button>
        <input
          ref={numberEl}
          type="number"
          step="1"
          className="pointer-events-auto w-full rounded-md border-2 border-gure bg-ki px-4 py-1 placeholder:italic placeholder:text-gure dark:border-ki dark:bg-kami dark:bg-katsu lg:col-span-5 lg:text-2xl"
          placeholder="Enter a number..."
          onKeyDown={handleKeyDown}
        ></input>
      </nav>
    </Layout>
  );
};

export default Home;
