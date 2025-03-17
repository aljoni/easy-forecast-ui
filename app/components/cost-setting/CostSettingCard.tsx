import {CostSettingType} from "~/types/cost-setting";
import {Card} from "~/components";

type CostSettingCardProps = {
    type: CostSettingType;
    name: string;
    value: string;
    onChange: (value: string) => void;
}

