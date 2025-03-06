import {useEffect, useState} from "react";
import CalculatorResultRow from "~/components/calculator/CalculatorResultRow";
import Card from "~/components/Card";
import TextField from "~/components/form/TextField";

const UnitEconomicCalculator: React.FC = () => {
    // -- User provided values
    // const [id, setId] = useState<string | null>(null);
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

    // -- Modal ref
    // const loadCalculationModalRef = useRef<LoadCalculationModalRef>(null);

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

    // const handleSave = () => {
    //   let model: AddCalculationResult = {
    //     name,
    //     calculationType: "UNIT_ECONOMIC",
    //     userData: JSON.stringify({
    //       __version: 1,
    //       monthlySessions,
    //       monthlyRevenue,
    //       monthlyOrders,
    //       monthlyNewCustomers,
    //       monthlyMarketingSpend,
    //       cogsPercent,
    //       averageCostToShip,
    //       averageCostOfPackaging,
    //       averageMerchantFee,
    //       estimatedTotalMonthlyFixedCosts,
    //     }),
    //   };
    //
    //   if (id === null) {
    //     postCalculationResult(shopify.config.shop!, model).then((response) => {
    //       if (response?.responseStatus !== "OK") {
    //         const errorString = response?.errors?.map((error) => error.message).join(", ");
    //         shopify.toast.show(`Error saving calculation: ${errorString}`, { isError: true });
    //         return;
    //       }
    //
    //       setId(response?.payload?.id ?? null);
    //       shopify.toast.show("Calculation saved");
    //     });
    //   } else {
    //     putCalculationResult(shopify.config.shop!, id, model).then((response) => {
    //       if (response?.responseStatus !== "OK") {
    //         const errorString = response?.errors?.map((error) => error.message).join(", ");
    //         shopify.toast.show(`Error updating calculation: ${errorString}`, { isError: true });
    //         return;
    //       }
    //
    //       shopify.toast.show("Calculation updated");
    //     });
    //   }
    // };

    // const handleNew = () => {
    //     setId(null);
    //     setName(`Result for ${new Date().toLocaleDateString()}`);
    //     setMonthlySessions("");
    //     setMonthlyRevenue("");
    //     setMonthlyOrders("");
    //     setMonthlyNewCustomers("");
    //     setMonthlyMarketingSpend("");
    //     setCogsPercent("");
    //     setAverageCostToShip("");
    //     setAverageCostOfPackaging("");
    //     setAverageMerchantFee("");
    //     setEstimatedTotalMonthlyFixedCosts("");
    // };

    // const handleLoadCalculation = async (resultId: string) => {
    //   if (!resultId) return;
    //
    //   const response = await getCalculationResult(shopify.config.shop!, resultId);
    //   if (!response) {
    //     shopify.toast.show("Unable to load calculation", { isError: true });
    //     return;
    //   }
    //
    //   const data = response.data as UnitEconomicCalculationData;
    //
    //   setId(response.id!);
    //   setName(response.name);
    //   setMonthlySessions(data.monthlySessions);
    //   setMonthlyRevenue(data.monthlyRevenue);
    //   setMonthlyOrders(data.monthlyOrders);
    //   setMonthlyNewCustomers(data.monthlyNewCustomers);
    //   setMonthlyMarketingSpend(data.monthlyMarketingSpend);
    //   setCogsPercent(data.cogsPercent);
    //   setAverageCostToShip(data.averageCostToShip);
    //   setAverageCostOfPackaging(data.averageCostOfPackaging);
    //   setAverageMerchantFee(data.averageMerchantFee);
    //   setEstimatedTotalMonthlyFixedCosts(data.estimatedTotalMonthlyFixedCosts);
    //
    //   shopify.toast.show("Calculation loaded");
    // };

    return (
        <>
            {/*<LoadCalculationModal*/}
            {/*  ref={loadCalculationModalRef}*/}
            {/*  id="load-calculation-modal-ue"*/}
            {/*  options={async () => {*/}
            {/*    const response = await getCalculationResultsByType(shopify.config.shop!, "UNIT_ECONOMIC");*/}

            {/*    return response*/}
            {/*      .map((result: CalculationResult): CalculationListItem => {*/}
            {/*        return {*/}
            {/*          id: result.id!,*/}
            {/*          name: result.name,*/}
            {/*          calculationType: result.type,*/}
            {/*        };*/}
            {/*      })*/}
            {/*      .sort((a, b) => a.name.localeCompare(b.name));*/}
            {/*  }}*/}
            {/*  onSelect={handleLoadCalculation}*/}
            {/*/>*/}
                <Card title="Unit Economic Calculator">
                    {/*<InlineGrid columns="1fr auto">*/}
                    {/*  <div className="flex flex-row gap-2">*/}
                    {/*    <Button variant="secondary" onClick={handleNew} accessibilityLabel="Create new calculation" icon={PlusIcon}>*/}
                    {/*      New*/}
                    {/*    </Button>*/}
                    {/*    <Button*/}
                    {/*      onClick={() => loadCalculationModalRef.current?.open()}*/}
                    {/*      accessibilityLabel="Load saved calculation"*/}
                    {/*      icon={FolderIcon}*/}
                    {/*    >*/}
                    {/*      Load*/}
                    {/*    </Button>*/}
                    {/*  </div>*/}
                    {/*</InlineGrid>*/}
                    <div className="flex flex-col gap-3 mb-8">
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
                    <hr className="my-6"/>
                    <div className="border border-slate-200 rounded-md">
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
                    {/*<Box paddingBlockStart="400">*/}
                    {/*    <InlineStack align="end">*/}
                    {/*        <Button onClick={handleSave} accessibilityLabel="Save calculation" variant="primary">*/}
                    {/*            Save Calculation*/}
                    {/*        </Button>*/}
                    {/*    </InlineStack>*/}
                    {/*</Box>*/}
                </Card>
        </>
    );
};

export default UnitEconomicCalculator;
