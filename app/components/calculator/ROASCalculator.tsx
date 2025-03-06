import React, {useEffect, useState} from "react";
import CalculatorResultRow from "~/components/calculator/CalculatorResultRow";
// import {
//     getCalculationResult,
//     getCalculationResultsByType,
//     postCalculationResult,
//     putCalculationResult,
// } from "~/javaApi";
import Card from "~/components/Card";
import TextField from "~/components/form/TextField";

const ROASCalculator: React.FC = () => {
    // -- User provided values
    // const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string>(`Result for ${new Date().toLocaleDateString()}`);
    const [grossRevenue, setGrossRevenue] = useState<string>("");
    const [cogs, setCogs] = useState<string>("");
    const [warehouseCost, setWarehouseCost] = useState<string>("");
    const [packagingCost, setPackagingCost] = useState<string>("");
    const [shippingCost, setShippingCost] = useState<string>("");
    const [merchantFee, setMerchantFee] = useState<string>("");
    const [currentCustomerAcquisitionCost, setCurrentCustomerAcquisitionCost] = useState<string>("");
    const [frequencyOfPurchase, setFrequencyOfPurchase] = useState<string>("");

    // -- Calculated values
    const [profitPerOrder, setProfitPerOrder] = useState<string>("£-.--");
    const [rawProfitPerOrder, setRawProfitPerOrder] = useState<number>(0);
    const [netPerOrder, setNetPerOrder] = useState<string>("£-.--");
    const [twelveMonthLTV, setTwelveMonthLTV] = useState<string>("£-.--");

    // -- Modal ref
    // const loadCalculationModalRef = useRef<LoadCalculationModalRef>(null);

    useEffect(() => {
        try {
            const grossRevenueValue = parseFloat(grossRevenue);
            const cogsValue = parseFloat(cogs);
            const warehouseCostValue = parseFloat(warehouseCost);
            const packagingCostValue = parseFloat(packagingCost);
            const shippingCostValue = parseFloat(shippingCost);
            const merchantFeeValue = parseFloat(merchantFee);

            if (
                isNaN(grossRevenueValue) ||
                isNaN(cogsValue) ||
                isNaN(warehouseCostValue) ||
                isNaN(packagingCostValue) ||
                isNaN(shippingCostValue) ||
                isNaN(merchantFeeValue)
            ) {
                setProfitPerOrder("£-.--");
                setRawProfitPerOrder(0);
                return;
            }

            const sum = cogsValue + warehouseCostValue + packagingCostValue + shippingCostValue + merchantFeeValue;
            const profitPerOrder = grossRevenueValue - sum;
            setProfitPerOrder(`£${profitPerOrder.toFixed(2)}`);
            setRawProfitPerOrder(profitPerOrder);
        } catch (error) {
            setProfitPerOrder("£-.--");
            setRawProfitPerOrder(0);
        }
    }, [grossRevenue, cogs, warehouseCost, packagingCost, shippingCost, merchantFee]);

    useEffect(() => {
        try {
            const customerAcquisitionCostValue = parseFloat(currentCustomerAcquisitionCost);

            if (isNaN(customerAcquisitionCostValue)) {
                setNetPerOrder("£-.--");
                return;
            }

            const netPerOrder = rawProfitPerOrder - customerAcquisitionCostValue;
            setNetPerOrder(`£${netPerOrder.toFixed(2)}`);
        } catch (error) {
            setNetPerOrder("£-.--");
        }
    }, [currentCustomerAcquisitionCost, rawProfitPerOrder]);

    useEffect(() => {
        try {
            const frequencyOfPurchaseValue = parseFloat(frequencyOfPurchase) / 100;
            const customerAcquisitionCost = parseFloat(currentCustomerAcquisitionCost);

            if (isNaN(frequencyOfPurchaseValue) || isNaN(customerAcquisitionCost)) {
                setTwelveMonthLTV("£-.--");
                return;
            }

            const twelveMonthLTV = rawProfitPerOrder * frequencyOfPurchaseValue - customerAcquisitionCost;
            setTwelveMonthLTV(`£${twelveMonthLTV.toFixed(2)}`);
        } catch (error) {
            setTwelveMonthLTV("£-.--");
        }
    }, [frequencyOfPurchase, currentCustomerAcquisitionCost, rawProfitPerOrder]);

    // const handleSave = () => {
    //     let model: AddCalculationResult = {
    //         name,
    //         calculationType: "ROAS",
    //         userData: JSON.stringify({
    //             __version: 1,
    //             grossRevenue,
    //             cogs,
    //             warehouseCost,
    //             packagingCost,
    //             shippingCost,
    //             merchantFee,
    //             currentCustomerAcquisitionCost,
    //             frequencyOfPurchase,
    //         }),
    //     };
    //
    //     if (id === null) {
    //         postCalculationResult(shopify.config.shop!, model).then((response) => {
    //             if (response?.responseStatus !== "OK") {
    //                 const errorString = response?.errors?.map((error) => error.message).join(", ");
    //                 shopify.toast.show(`Error saving calculation: ${errorString}`, {isError: true});
    //                 return;
    //             }
    //
    //             setId(response?.payload?.id ?? null);
    //             shopify.toast.show("Calculation saved");
    //         });
    //     } else {
    //         putCalculationResult(shopify.config.shop!, id, model).then((response) => {
    //             if (response?.responseStatus !== "OK") {
    //                 const errorString = response?.errors?.map((error) => error.message).join(", ");
    //                 shopify.toast.show(`Error updating calculation: ${errorString}`, {isError: true});
    //                 return;
    //             }
    //
    //             shopify.toast.show("Calculation updated");
    //         });
    //     }
    // };

    // const handleNew = () => {
    //     setId(null);
    //     setName(`Result for ${new Date().toLocaleDateString()}`);
    //     setGrossRevenue("");
    //     setCogs("");
    //     setWarehouseCost("");
    //     setPackagingCost("");
    //     setShippingCost("");
    //     setMerchantFee("");
    //     setCurrentCustomerAcquisitionCost("");
    //     setFrequencyOfPurchase("");
    // };

    // const handleLoadCalculation = async (resultId: string) => {
    //     if (!resultId) return;
    //
    //     const response = await getCalculationResult(shopify.config.shop!, resultId);
    //     if (!response) {
    //         shopify.toast.show("Unable to load calculation", {isError: true});
    //         return;
    //     }
    //
    //     const data = response.data as ROASCalculationData;
    //
    //     setId(response.id!);
    //     setName(response.name);
    //     setGrossRevenue(data.grossRevenue);
    //     setCogs(data.cogs);
    //     setWarehouseCost(data.warehouseCost);
    //     setPackagingCost(data.packagingCost);
    //     setShippingCost(data.shippingCost);
    //     setMerchantFee(data.merchantFee);
    //     setCurrentCustomerAcquisitionCost(data.currentCustomerAcquisitionCost);
    //     setFrequencyOfPurchase(data.frequencyOfPurchase);
    //
    //     shopify.toast.show("Calculation loaded");
    // };

    return (
        <>
            {/*<LoadCalculationModal*/}
            {/*    ref={loadCalculationModalRef}*/}
            {/*    id="load-calculation-modal-r"*/}
            {/*    options={async () => {*/}
            {/*        const response = await getCalculationResultsByType(shopify.config.shop!, "ROAS");*/}

            {/*        return response*/}
            {/*            .map((result: CalculationResult): CalculationListItem => {*/}
            {/*                return {*/}
            {/*                    id: result.id!,*/}
            {/*                    name: result.name,*/}
            {/*                    calculationType: result.type,*/}
            {/*                };*/}
            {/*            })*/}
            {/*            .sort((a, b) => a.name.localeCompare(b.name));*/}
            {/*    }}*/}
            {/*    onSelect={handleLoadCalculation}*/}
            {/*/>*/}
            <Card title="ROAS Calculator" className="w-[400px] mx-auto">
                {/*<div className="flex flex-row gap-2">*/}
                {/*    <Button variant="secondary" onClick={handleNew} accessibilityLabel="Create new calculation"*/}
                {/*            icon={PlusIcon}>*/}
                {/*        New*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        variant="secondary"*/}
                {/*        onClick={() => loadCalculationModalRef.current?.open()}*/}
                {/*        accessibilityLabel="Load saved calculation"*/}
                {/*        icon={FolderIcon}*/}
                {/*    >*/}
                {/*        Load*/}
                {/*    </Button>*/}
                {/*</div>*/}
                <div className="flex flex-col gap-3 mb-8">
                    <TextField
                        autoComplete="off"
                        label="Name"
                        value={name}
                        onChange={(value) => setName(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Gross Revenue After Tax"
                        prefix="£"
                        value={grossRevenue}
                        onChange={(value) => setGrossRevenue(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="COGS"
                        prefix="£"
                        value={cogs}
                        onChange={(value) => setCogs(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Warehouse Cost"
                        prefix="£"
                        value={warehouseCost}
                        onChange={(value) => setWarehouseCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Packaging Cost"
                        prefix="£"
                        value={packagingCost}
                        onChange={(value) => setPackagingCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Shipping Cost"
                        prefix="£"
                        value={shippingCost}
                        onChange={(value) => setShippingCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Merchant Fee"
                        prefix="£"
                        value={merchantFee}
                        onChange={(value) => setMerchantFee(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Current Customer Acquisition Cost"
                        prefix="£"
                        value={currentCustomerAcquisitionCost}
                        onChange={(value) => setCurrentCustomerAcquisitionCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Frequency of Purchase (per year)"
                        value={frequencyOfPurchase}
                        suffix="%"
                        onChange={(value) => setFrequencyOfPurchase(value)}
                    />
                </div>
                <div className="border border-slate-200 rounded-md">
                    <table className="w-full">
                        <tbody>
                        <CalculatorResultRow label="Profit per Order (without ad spend)"
                                             value={profitPerOrder}/>
                        <CalculatorResultRow label="Net Profit per Order" value={netPerOrder}/>
                        <CalculatorResultRow label="12M LTV Profit" value={twelveMonthLTV}/>
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

export default ROASCalculator;
