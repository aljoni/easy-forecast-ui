import React, {useCallback, useEffect, useState} from "react";
import CalculatorResultRow from "~/components/calculator/CalculatorResultRow";
import Card from "~/components/Card";
import TextField from "~/components/form/TextField";
import {NotificationType} from "~/components/NotificationProvider";
import {saveCalculationResult} from "~/api/calculation";
import {CalculationResult} from "~/types/api/request/CalculationResult";
import LoadCalculationModal from "~/components/calculator/LoadCalculationModal";
import UnitEconomicCalculationData from "~/types/calculation/UnitEconomicCalculationData";
import {FaFolderOpen, FaPlus} from "react-icons/fa6";
import Button from "~/components/form/Button";
import {FaSave} from "react-icons/fa";

type UnitEconomicCalculatorProps = {
    onNotify?: (message: string, type: NotificationType) => void;
};

const UnitEconomicCalculator: React.FC<UnitEconomicCalculatorProps> = ({onNotify}) => {
    // -- User provided values
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string>(`Result for ${new Date().toLocaleDateString()}`);
    const [monthlySessions, setMonthlySessions] = useState<string>("");
    const [monthlyRevenue, setMonthlyRevenue] = useState<string>("");
    const [monthlyOrders, setMonthlyOrders] = useState<string>("");
    const [monthlyNewCustomers, setMonthlyNewCustomers] = useState<string>("");
    const [monthlyMarketingSpend, setMonthlyMarketingSpend] = useState<string>("");
    const [cogsPercent, setCogsPercent] = useState<string>("");
    const [averageCostToShip, setAverageCostToShip] = useState<string>("");
    const [averageCostOfPackaging, setAverageCostOfPackaging] = useState<string>("");
    const [averageMerchantFee, setAverageMerchantFee] = useState<string>("");
    const [estimatedTotalMonthlyFixedCosts, setEstimatedTotalMonthlyFixedCosts] = useState<string>("");

    // -- Calculated values
    const [conversionRate, setConversionRate] = useState<string>("0.0%");
    const [averageOrderValue, setAverageOrderValue] = useState<string>("£-.--");
    const [customerAcquisitionCost, setCustomerAcquisitionCost] = useState<string>("£-.--");
    const [totalCOGSCost, setTotalCOGSCost] = useState<string>("£-.--");
    const [perOrderProfit, setPerOrderProfit] = useState<string>("£-.--");
    const [ordersRequiredToBreakEven, setOrdersRequiredToBreakEven] = useState<string>("-");

    const [rawAverageOrderValue, setRawAverageOrderValue] = useState<number>(0);
    const [rawCustomerAcquisitionCost, setRawCustomerAcquisitionCost] = useState<number>(0);
    const [rawTotalCOGSCost, setRawTotalCOGSCost] = useState<number>(0);
    const [rawPerOrderProfit, setRawPerOrderProfit] = useState<number>(0);

    // -- Modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        try {
            const monthlySessionsValue = parseFloat(monthlySessions);
            const monthlyOrdersValue = parseFloat(monthlyOrders);

            if (isNaN(monthlySessionsValue) || isNaN(monthlyOrdersValue)) {
                setConversionRate("0.0%");
                return;
            }

            const conversionRate = (monthlyOrdersValue / monthlySessionsValue) * 100;
            setConversionRate(`${conversionRate.toFixed(1)}%`);
        } catch (error) {
            setConversionRate("0.0%");
        }
    }, [monthlySessions, monthlyOrders]);

    useEffect(() => {
        try {
            const monthlyRevenueValue = parseFloat(monthlyRevenue);
            const monthlyOrdersValue = parseFloat(monthlyOrders);

            if (isNaN(monthlyRevenueValue) || isNaN(monthlyOrdersValue)) {
                setAverageOrderValue("£-.--");
                setRawAverageOrderValue(0);
                return;
            }

            const averageOrderValue = monthlyRevenueValue / monthlyOrdersValue;
            setAverageOrderValue(`£${averageOrderValue.toFixed(2)}`);
            setRawAverageOrderValue(averageOrderValue);
        } catch (error) {
            setAverageOrderValue("£-.--");
            setRawAverageOrderValue(0);
        }
    }, [monthlyRevenue, monthlyOrders]);

    useEffect(() => {
        try {
            const monthlyNewCustomersValue = parseFloat(monthlyNewCustomers);
            const monthlyMarketingSpendValue = parseFloat(monthlyMarketingSpend);

            if (isNaN(monthlyNewCustomersValue) || isNaN(monthlyMarketingSpendValue)) {
                setCustomerAcquisitionCost("£-.--");
                setRawCustomerAcquisitionCost(0);
                return;
            }

            const customerAcquisitionCost = monthlyMarketingSpendValue / monthlyNewCustomersValue;
            setCustomerAcquisitionCost(`£${customerAcquisitionCost.toFixed(2)}`);
            setRawCustomerAcquisitionCost(customerAcquisitionCost);
        } catch (error) {
            setCustomerAcquisitionCost("£-.--");
            setRawCustomerAcquisitionCost(0);
        }
    }, [monthlyNewCustomers, monthlyMarketingSpend]);

    useEffect(() => {
        try {
            const cogsValue = parseFloat(cogsPercent) / 100;
            const costToShipValue = parseFloat(averageCostToShip);
            const costOfPackagingValue = parseFloat(averageCostOfPackaging);
            const merchantFeeValue = parseFloat(averageMerchantFee) / 100;

            if (
                isNaN(cogsValue) ||
                isNaN(costToShipValue) ||
                isNaN(costOfPackagingValue) ||
                isNaN(merchantFeeValue) ||
                isNaN(rawAverageOrderValue) ||
                rawAverageOrderValue <= 0
            ) {
                setTotalCOGSCost("£-.--");
                setRawTotalCOGSCost(0);
                return;
            }

            const totalCOGSCost =
                rawAverageOrderValue * cogsValue +
                costToShipValue +
                costOfPackagingValue +
                merchantFeeValue * rawAverageOrderValue;
            setTotalCOGSCost(`£${totalCOGSCost.toFixed(2)}`);
            setRawTotalCOGSCost(totalCOGSCost);
        } catch (error) {
            setTotalCOGSCost("£-.--");
            setRawTotalCOGSCost(0);
        }
    }, [rawAverageOrderValue, cogsPercent, averageCostToShip, averageCostOfPackaging, averageMerchantFee]);

    useEffect(() => {
        if (rawAverageOrderValue <= 0 || rawCustomerAcquisitionCost <= 0 || rawTotalCOGSCost <= 0) {
            setPerOrderProfit("£-.--");
            setRawPerOrderProfit(0);
            return;
        }

        const perOrderProfit = rawAverageOrderValue - rawCustomerAcquisitionCost - rawTotalCOGSCost;
        setPerOrderProfit(`£${perOrderProfit.toFixed(2)}`);
        setRawPerOrderProfit(perOrderProfit);
    }, [rawAverageOrderValue, rawCustomerAcquisitionCost, rawTotalCOGSCost]);

    useEffect(() => {
        try {
            const monthlyFixedCostsValue = parseFloat(estimatedTotalMonthlyFixedCosts);

            if (isNaN(monthlyFixedCostsValue) || rawPerOrderProfit <= 0) {
                setOrdersRequiredToBreakEven("-");
                return;
            }

            const ordersRequiredToBreakEven = monthlyFixedCostsValue / rawPerOrderProfit;
            setOrdersRequiredToBreakEven(ordersRequiredToBreakEven.toFixed(2));
        } catch (error) {
            setOrdersRequiredToBreakEven("-");
        }
    }, [estimatedTotalMonthlyFixedCosts, rawPerOrderProfit]);

    const handleSave = () => {
        const model: CalculationResult = {
            name,
            calculationType: "UNIT_ECONOMIC",
            userData: JSON.stringify({
                __version: 1,
                monthlySessions,
                monthlyRevenue,
                monthlyOrders,
                monthlyNewCustomers,
                monthlyMarketingSpend,
                cogsPercent,
                averageCostToShip,
                averageCostOfPackaging,
                averageMerchantFee,
                estimatedTotalMonthlyFixedCosts,
            }),
        };

        if (id === null) {
            saveCalculationResult(model).then((response) => {
                if (response === null) {
                    onNotify?.("Error saving calculation", "error");
                    return;
                }

                setId(response?.id ?? null);
                onNotify?.("Calculation saved", "success");
            });
        }
    };

    const handleNew = () => {
        setId(null);
        setName(`Result for ${new Date().toLocaleDateString()}`);
        setMonthlySessions("");
        setMonthlyRevenue("");
        setMonthlyOrders("");
        setMonthlyNewCustomers("");
        setMonthlyMarketingSpend("");
        setCogsPercent("");
        setAverageCostToShip("");
        setAverageCostOfPackaging("");
        setAverageMerchantFee("");
        setEstimatedTotalMonthlyFixedCosts("");
    };

    const handleLoadCalculation = async (calculation: CalculationResult | null) => {
        handleCloseModal();

        if (!calculation) return;

        const data = JSON.parse(calculation.userData) as UnitEconomicCalculationData;

        setId(calculation.id!);
        setName(calculation.name);
        setMonthlySessions(data.monthlySessions);
        setMonthlyRevenue(data.monthlyRevenue);
        setMonthlyOrders(data.monthlyOrders);
        setMonthlyNewCustomers(data.monthlyNewCustomers);
        setMonthlyMarketingSpend(data.monthlyMarketingSpend);
        setCogsPercent(data.cogsPercent);
        setAverageCostToShip(data.averageCostToShip);
        setAverageCostOfPackaging(data.averageCostOfPackaging);
        setAverageMerchantFee(data.averageMerchantFee);
        setEstimatedTotalMonthlyFixedCosts(data.estimatedTotalMonthlyFixedCosts);

        onNotify?.("Calculation loaded", "success");
    };

    return (
        <>
            <LoadCalculationModal
                calculationType="UNIT_ECONOMIC"
                onNotify={onNotify}
                onClose={handleLoadCalculation}
                isOpen={isModalOpen}
            />
            <Card
                title="Unit Economic Calculator"
                className="w-[450px] mx-auto"
                actions={[
                    {
                        label: "New",
                        onClick: handleNew,
                        icon: <FaPlus/>,
                    },
                    {
                        label: "Load",
                        onClick: handleOpenModal,
                        icon: <FaFolderOpen/>,
                    },
                ]}
            >
                <div className="flex flex-col gap-2 mb-8">
                    <TextField autoComplete="off" label="Name" value={name} onChange={(value) => setName(value)}/>
                    <TextField
                        autoComplete="off"
                        label="Total Monthly Sessions"
                        value={monthlySessions}
                        onChange={(value) => setMonthlySessions(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Total Monthly Revenue"
                        prefix="£"
                        value={monthlyRevenue}
                        onChange={(value) => setMonthlyRevenue(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Total Monthly Orders"
                        value={monthlyOrders}
                        onChange={(value) => setMonthlyOrders(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Total Monthly New Customers"
                        value={monthlyNewCustomers}
                        onChange={(value) => setMonthlyNewCustomers(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Total Monthly Marketing Spend"
                        prefix="£"
                        value={monthlyMarketingSpend}
                        onChange={(value) => setMonthlyMarketingSpend(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="COGS % (Cost of goods divided by sales price)"
                        suffix="%"
                        value={cogsPercent}
                        onChange={(value) => setCogsPercent(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Average Cost to Ship (Per Order)"
                        prefix="£"
                        value={averageCostToShip}
                        onChange={(value) => setAverageCostToShip(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Average Cost of Packaging (Per Order)"
                        prefix="£"
                        value={averageCostOfPackaging}
                        onChange={(value) => setAverageCostOfPackaging(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Average Merchant Fee % (Usually 3.5%)"
                        suffix="%"
                        value={averageMerchantFee}
                        onChange={(value) => setAverageMerchantFee(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Estimated Total Monthly Fixed Costs"
                        prefix="£"
                        value={estimatedTotalMonthlyFixedCosts}
                        onChange={(value) => setEstimatedTotalMonthlyFixedCosts(value)}
                    />
                </div>

                <div className="border border-slate-200 rounded-lg mb-8">
                    <table className="w-full">
                        <tbody>
                        <CalculatorResultRow label="Conversion Rate (CR)" value={conversionRate}/>
                        <CalculatorResultRow label="Average Order Value (AOV)" value={averageOrderValue}/>
                        <CalculatorResultRow label="Customer Aquisition Cost (CAC)"
                                             value={customerAcquisitionCost}/>
                        <CalculatorResultRow label="Total COGS Cost" value={totalCOGSCost}/>
                        <CalculatorResultRow label="Per Order Profit" value={perOrderProfit}/>
                        <CalculatorResultRow label="Orders Required to Break Even"
                                             value={ordersRequiredToBreakEven}/>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-row gap-2 justify-end">
                    <Button
                        variant="success"
                        size="md"
                        onClick={handleSave}
                        accessibilityLabel="Save calculation"
                        icon={<FaSave/>}
                    >
                        Save Calculation
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default UnitEconomicCalculator;
