import { CostSettingCategoryType } from "~/types";

type FixedCost = {
    id?: string;
    category: CostSettingCategoryType;
    cost: number;
    startDate: Date;
    endDate: Date;
    interval: number;
    period: "days" | "weeks" | "months" | "years";
}

export type { FixedCost };