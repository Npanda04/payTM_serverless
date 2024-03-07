export const SideBanner = () =>{
    return <div className="items-center justify-center p-6 lg:flex lg:bg-gray-100 lg:min-h-screen dark:lg:bg-gray-800">
    <div className="mx-auto grid max-w-[350px] gap-3 lg:max-w-[500px]">
      <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-xl">
        “Experience the convenience of online payments. Secure, fast, and hassle-free.“
      </blockquote>
      <div>
        <div className="font-semibold">How to use:-</div>
        <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400">
          <li>yash@gmail.com, 123456 as login creds</li>
          <li>deepanshu22@gmail.com, 123456 as login creds</li>
          <li>you can create your own account throght signup page</li>
          <li>transfer money from one id to another</li>
          <li>several things has been taken into consideration like </li>
          <li>you can not transfer money to yourself</li>
          <li>you can not transfer money over your existing balance </li>
          <li>things to be implemented are:-</li>
          <li>recent transactions</li>
          <li>friend lists</li>
          <li>send to random user's just like sending to phone numbers</li>
          <li>some UX/UI improvements</li>
        </ul>
      </div>
    </div>
  </div>
}