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

const Gradient: FCC = ({ children }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#EBEBEB] to-[#F8F8F8] dark:from-[#313131] dark:to-[#2B2B2B]">
      {children}
    </div>
  );
};

export const Home: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-4 p-8">
        <Card className="w-60 cursor-pointer rounded-xl dark:bg-[#1B1B1B]">
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

        <Card className="w-60 cursor-pointer rounded-xl dark:bg-[#1B1B1B]">
          <CardHeader>
            <div className="h-12 w-12">
              <Gradient>
                <Tag className="m-auto" />
              </Gradient>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pr-4 font-mono text-sm font-medium">
              Sale Agreements
            </div>
          </CardContent>
        </Card>

        <Card className="w-60 cursor-pointer rounded-xl dark:bg-[#1B1B1B]">
          <CardHeader>
            <div className="h-12 w-12">
              <Gradient>
                <ShoppingBag className="m-auto" />
              </Gradient>
            </div>
          </CardHeader>
          <CardContent>
            <div className="pr-4 font-mono text-sm font-medium">
              Purchase Agreements
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
