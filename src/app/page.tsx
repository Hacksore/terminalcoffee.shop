import Terminal from "@terminaldotshop/sdk";

const client = new Terminal({
  bearerToken: process.env["TERMINAL_BEARER_TOKEN"],
});

type ProductList = Awaited<ReturnType<typeof client.product.list>>;
type Product = ProductList["data"][number];

const ProductCard = ({ sku }: { sku: Product }) => {
  return (
    <div className="flex flex-col gap-2 max-w-2xl rounded-2xl px-4 py-2 border border-zinc-800">
      <h1 className="text-3xl font-bold">{sku.name}</h1>
      <p>{sku.description}</p>
    </div>
  );
}

export default async function Home() {
  const { data } = await client.product.list();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-2">
        <h2 className="text-5xl font-bold">Terminal Coffee</h2>
        {/* add a blinking orange cursor after the header*/}
        <div className="w-5 h-10 bg-orange-500 blink"></div>
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </main>

    </div>
  );
}
