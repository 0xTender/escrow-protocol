import { FCC } from "@app/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Plus, ShoppingBag, Tag } from "lucide-react";
import Link from "next/link";
import { api } from "@app/utils/api";
import { useAccount } from "wagmi";

const Gradient: FCC = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#EBEBEB] to-[#F8F8F8] dark:from-[#313131] dark:to-[#2B2B2B]">
      {children}
    </div>
  );
};

export const Home: React.FC = () => {
  const { address } = useAccount();

  const { data } = api.escrow.salesAndPurchases.useQuery(
    {
      address,
    },
    {
      enabled: !!address,
    }
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 p-8  md:justify-normal">
        <Link href={"/create"}>
          <Card className="w-64 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] sm:w-80 md:w-60">
            <CardHeader>
              <div className="h-12 w-12">
                <Gradient>
                  <Plus />
                </Gradient>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pr-4 font-mono text-sm font-medium">
                New Agreement
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/sale"}>
          <Card className="w-64 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] sm:w-80 md:w-60">
            <CardHeader className="flex-row justify-between">
              <div className="h-12 w-12">
                <Gradient>
                  <Tag className="m-auto" />
                </Gradient>
              </div>
              <div>{data && data[0]}</div>
            </CardHeader>
            <CardContent>
              <div className="pr-4 font-mono text-sm font-medium">
                Sale Agreements
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={"/purchase"}>
          <Card className="w-64 cursor-pointer rounded-none dark:rounded-xl dark:bg-[#1B1B1B] sm:w-80 md:w-60">
            <CardHeader className="flex-row justify-between">
              <div className="h-12 w-12">
                <Gradient>
                  <ShoppingBag className="m-auto" />
                </Gradient>
              </div>
              <div>{data && data[1]}</div>
            </CardHeader>
            <CardContent>
              <div className="pr-4 font-mono text-sm font-medium">
                Purchase Agreements
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};
