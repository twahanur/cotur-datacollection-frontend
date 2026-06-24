import { Card, CardContent, CardHeader } from "../card";
import { Skeleton } from "../skeleton";

export const ChartSkeleton = ({ height = 320 }: { height?: number }) => (
  <Card className="effect">
    <CardHeader>
      <Skeleton className="h-5 w-40" />
    </CardHeader>
    <CardContent>
      <Skeleton className="w-full rounded-md" style={{ height }} />
    </CardContent>
  </Card>
);
