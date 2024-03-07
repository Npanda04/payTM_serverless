export const SideBanner = () =>{
    return <div className="items-center justify-center p-6 lg:flex lg:bg-gray-100 lg:min-h-screen dark:lg:bg-gray-800">
    <div className="mx-auto grid max-w-[350px] gap-3 lg:max-w-[500px]">
      <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-xl">
        “Experience the convenience of online payments. Secure, fast, and hassle-free.“
      </blockquote>
      <div>
        <div className="font-semibold">Benefits of Online Payments</div>
        <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
          <li>Instant transactions</li>
          <li>Secure payment methods</li>
          <li>24/7 access to your funds</li>
          <li>Track your spending easily</li>
        </ul>
      </div>
    </div>
  </div>
}