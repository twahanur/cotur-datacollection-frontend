/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useMemo } from "react";
import EmptyState from "./EmptyState";
import { safeArray, safeString, safeNumber, isEmpty } from "@/hooks/useSafeData";

type TPieChartProps<DataItem extends Record<string, any>> = {
  id: string;
  chartData?: DataItem[] | null;
  activeCategoryKey: keyof DataItem;
  valueKey: keyof DataItem;
  nameKey: keyof DataItem;
  activeCategory?: DataItem[keyof DataItem] | null;
  emptyTitle?: string;
  emptyDescription?: string;
  height?: number
  width?: number
};

const ReusablePieChart = <DataItem extends Record<string, any>>({
  id,
  chartData,
  valueKey,
  nameKey,
  activeCategoryKey,
  activeCategory,
  emptyTitle = "No Data Available",
  emptyDescription = "There is no data to display in the chart",
  height = 500,
  width = 500 
}: TPieChartProps<DataItem>) => {
  // Safe data handling
  const safeChartData = useMemo(() => {
    return safeArray(chartData);
  }, [chartData]);

  // Generate chartConfig dynamically from data with safety checks
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    
    if (isEmpty(safeChartData)) {
      return config;
    }
    
    safeChartData.forEach((item, index) => {
      if (!item) return;
      
      const name = safeString(item[nameKey], `Item ${index + 1}`);
      const color = safeString(item.color, '#8884d8');
      
      config[name] = {
        label: name,
        color: color,
      };
    });
    
    return config;
  }, [safeChartData, nameKey]);

  const activeIndex = useMemo(() => {
    if (isEmpty(safeChartData) || !activeCategory) {
      return -1;
    }
    
    return safeChartData.findIndex((item) => 
      item?.[activeCategoryKey] === activeCategory
    );
  }, [safeChartData, activeCategory, activeCategoryKey]);

  // Handle empty data case
  if (isEmpty(safeChartData)) {
    return (
      <div className="flex items-center justify-center h-64">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          icon="📈"
        />
      </div>
    );
  }

  return (
    <>
      <ChartStyle id={id} config={chartConfig} />
      <ChartContainer
        id={id}
        config={chartConfig}
        className="aspect-square w-full max-w-full p-0 shadow-none bg-transparent backdrop-blur-none mx-auto"
         style={{ height: "100%", maxHeight: height, maxWidth: "100%" }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <g>
            <circle
              cx="50%"
              cy="50%"
              r={60}
              className="fill-white/10 stroke-white/20"
              strokeWidth={2}
            />
          </g>
          <Pie
            data={safeChartData}
            dataKey={valueKey as string}
            nameKey={nameKey as string}
            stroke="none"
            innerRadius="60%"
            outerRadius="80%"
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            activeShape={({
              cx = 0,
              cy = 0,
              midAngle = 0,
              innerRadius = 0,
              outerRadius = 0,
              fill,
              startAngle,
              endAngle,
            }: PieSectorDataItem) => {
              const RADIAN = Math.PI / 180;
              const radialOffset = 0;
              const innerExtra = 25;
              const outerExtra = 15;
              const strokeWidth = 3;
              const strokeColor = "#fff";
              const offsetX = radialOffset * Math.cos(-midAngle * RADIAN);
              const offsetY = radialOffset * Math.sin(-midAngle * RADIAN);

              const newCx = cx + offsetX;
              const newCy = cy + offsetY;
              const finalInnerRadius = innerRadius - innerExtra;
              const finalOuterRadius = outerRadius + outerExtra;

              return (
                <g>
                  {/* Enlarged fill */}
                  <Sector
                    cx={newCx}
                    cy={newCy}
                    innerRadius={finalInnerRadius}
                    outerRadius={finalOuterRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill ?? '#8884d8'}
                    stroke="none"
                  />

                  {/* White stroke */}
                  <Sector
                    cx={newCx}
                    cy={newCy}
                    innerRadius={finalInnerRadius}
                    outerRadius={finalOuterRadius + strokeWidth / 2}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                  />
                </g>
              );
            }}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox && "cy" in viewBox))
                  return null;

                const activeItem = safeChartData?.[activeIndex >= 0 ? activeIndex : 0];
                const value = activeItem?.[valueKey];
                const safeValue = safeNumber(value, 0);

                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-xl md:text-2xl lg:text-3xl font-bold"
                  >
                    {safeValue.toFixed(1)}%
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default ReusablePieChart;
