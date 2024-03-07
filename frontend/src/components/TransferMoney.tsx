/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FVphVfzwMqg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"





export default function TransferMoneyComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-3xl p-8">
        <CardHeader>
          <CardTitle>Transfer money</CardTitle>
          <CardDescription>Enter the recipient's information and the transfer amount.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input id="to" placeholder="Enter recipient" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" placeholder="Enter amount" type="number" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Send</Button>
        </CardFooter>
      </Card>
    </div>
  )
}



