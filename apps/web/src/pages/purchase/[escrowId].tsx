import { api } from "@app/utils/api";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const PurchaseEscrowPage: FC = () => {
  const router = useRouter();

  const { escrowId: escrowIdQuery } = router.query;

  const [escrowId, setEscrowId] = useState<string>();

  useEffect(() => {
    setEscrowId(escrowIdQuery as string);
  }, [setEscrowId, escrowIdQuery]);

  const { data } = api.escrow.details.useQuery(
    {
      escrowId: escrowId as string,
    },
    {
      enabled: !!escrowId,
    }
  );

  console.log({ data, escrowId }, router.query);

  return <div></div>;
};

export default PurchaseEscrowPage;
