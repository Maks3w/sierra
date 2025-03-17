import {Suspense} from "react";
import DgtPmv from '@/components/dgt/DgtPmv';

export default function PmvPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DgtPmv panelId="GUID_PMV_61830"/>
        <DgtPmv panelId="GUID_PMV_61457"/>
      </Suspense>
    </div>
  );
};
