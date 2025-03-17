import React, {useCallback, useEffect, useState} from "react";
import {FaFolderOpen, FaPlus} from "react-icons/fa6";
import {FaSave} from "react-icons/fa";

import {saveCalculationResult, updateCalculationResult} from "~/api";
import {Button, Card, CalculatorResultRow, TextField, LoadCalculationModal, NotificationType} from "~/components";
import {CalculationResult, ROASCalculationData} from "~/types";

type ROASCalculatorProps = {
    onNotify?: (message: string, type: NotificationType) => void;
};

const ROASCalculator: React.FC<ROASCalculatorProps> = ({onNotify}) => {
    // -- User provided values
    const [id, setId] = useState<string | null>(null);
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

    const handleSave = useCallback(() => {
        const model: CalculationResult = {
            name,
            calculationType: "ROAS",
            userData: JSON.stringify({
                __version: 1,
                grossRevenue,
                cogs,
                warehouseCost,
                packagingCost,
                shippingCost,
                merchantFee,
                currentCustomerAcquisitionCost,
                frequencyOfPurchase,
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
        } else {
            updateCalculationResult(id, model).then((response) => {
                if (response === null) {
                    onNotify?.("Error updating calculation", "error");
                    return;
                }

                onNotify?.("Calculation updated", "success");
            });
        }
    }, [onNotify, grossRevenue, cogs, warehouseCost, packagingCost, shippingCost, merchantFee, currentCustomerAcquisitionCost, frequencyOfPurchase, id, name]);

    const handleNew = useCallback(() => {
        setId(null);
        setName(`Result for ${new Date().toLocaleDateString()}`);
        setGrossRevenue("");
        setCogs("");
        setWarehouseCost("");
        setPackagingCost("");
        setShippingCost("");
        setMerchantFee("");
        setCurrentCustomerAcquisitionCost("");
        setFrequencyOfPurchase("");
    }, []);

    const handleLoadCalculation = async (calculation: CalculationResult | null) => {
        handleCloseModal();

        if (!calculation) return;

        const data = JSON.parse(calculation.userData) as ROASCalculationData;

        setId(calculation.id!);
        setName(calculation.name);
        setGrossRevenue(data.grossRevenue);
        setCogs(data.cogs);
        setWarehouseCost(data.warehouseCost);
        setPackagingCost(data.packagingCost);
        setShippingCost(data.shippingCost);
        setMerchantFee(data.merchantFee);
        setCurrentCustomerAcquisitionCost(data.currentCustomerAcquisitionCost);
        setFrequencyOfPurchase(data.frequencyOfPurchase);

        onNotify?.("Calculation loaded", "success");
    };

    return (
        <>
            <LoadCalculationModal
                calculationType="ROAS"
                onNotify={onNotify}
                onClose={handleLoadCalculation}
                isOpen={isModalOpen}
            />
            <Card
                title="ROAS Calculator"
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
                        fontStyle="mono"
                        value={grossRevenue}
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setGrossRevenue(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="COGS"
                        prefix="£"
                        value={cogs}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setCogs(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Warehouse Cost"
                        prefix="£"
                        value={warehouseCost}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setWarehouseCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Packaging Cost"
                        prefix="£"
                        value={packagingCost}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setPackagingCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Shipping Cost"
                        prefix="£"
                        value={shippingCost}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setShippingCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Merchant Fee"
                        prefix="£"
                        value={merchantFee}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setMerchantFee(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Current Customer Acquisition Cost"
                        prefix="£"
                        value={currentCustomerAcquisitionCost}
                        fontStyle="mono"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setCurrentCustomerAcquisitionCost(value)}
                    />
                    <TextField
                        autoComplete="off"
                        label="Frequency of Purchase (per year)"
                        value={frequencyOfPurchase}
                        fontStyle="mono"
                        suffix="%"
                        pattern="^[0-9]+(\.[0-9]{1,2})?$"
                        onChange={(value) => setFrequencyOfPurchase(value)}
                    />
                </div>

                <div className="border border-stone-200 rounded-lg mb-8">
                    <table className="w-full">
                        <tbody>
                        <CalculatorResultRow label="Profit per Order (without ad spend)"
                                             value={profitPerOrder}/>
                        <CalculatorResultRow label="Net Profit per Order" value={netPerOrder}/>
                        <CalculatorResultRow label="12M LTV Profit" value={twelveMonthLTV}/>
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

export {ROASCalculator}
