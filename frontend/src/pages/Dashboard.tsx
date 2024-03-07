import AccountDetailsComponent from "@/components/AccountDetails"

import { FriendsComponent } from "@/components/FriendsComponent"
import { RecentTransaction } from "@/components/RecentTransaction"





export const Dashboard = () => {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <AccountDetailsComponent />

      <div className="p-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FriendsComponent />

        <RecentTransaction />

      </div>
    </div>
  )
}





