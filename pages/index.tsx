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
      <div className="grid grid-cols-1 lg:grid-cols-2 container mx-auto px-1 gap-4">
        <Block
          title="Conversion"
          version={0.1}
          func={Conversion}
          n={Number(router.query.number)}
        />
        <Block
          title="Digits"
          version={0.1}
          func={Digits}
          n={Number(router.query.number)}
        />
        <Block
          title="Remainders"
          version={0.1}
          func={Remainders}
          n={Number(router.query.number)}
        />
        <Block
          title="Factorization"
          version={0.2}
          func={Factorization}
          n={Number(router.query.number)}
        />
        <Block
          title="Transformations"
          version={0.1}
          func={Transformations}
          n={Number(router.query.number)}
        />
      </div>
      <nav className="grid grid-cols-1 lg:grid-cols-6 bottom-1 lg:bottom-8 h-40 lg:h-16 sticky px-1 lg:px-40 my-4 lg:my-16 pointer-events-none z-50 mx-auto container gap-1">
        <div className="grid gap-1 grid-cols-2 lg:grid-cols-5 lg:col-span-5 dark:bg-kami bg-katsu rounded-md border-2">
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
            className="active:bg-ki col-span-2 lg:col-span-1 transition pointer-events-auto rounded-md bg-kami text-katsu italic px-4 py-1"
          >
            <p>Random</p>
          </button>
        </div>
        <button
          type="button"
          onClick={handleNumber}
          className="border-2 order-1 lg:order-none row-span-2 active:bg-ki transition border-katsu dark:border-kami pointer-events-auto rounded-md lg:text-2xl bg-kami text-katsu italic px-4 py-1"
        >
          <p>Enter</p>
        </button>
        <input
          ref={numberEl}
          type="number"
          step="1"
          className="pointer-events-auto lg:text-2xl lg:col-span-5 w-full px-4 py-1 border-2 border-katsu dark:border-ki dark:bg-katsu placeholder:italic placeholder:text-gure rounded-md bg-kami"
          placeholder="Enter a number..."
          onKeyDown={handleKeyDown}
        ></input>
      </nav>
    </Layout>
  );
};

export default Home;
