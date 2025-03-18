import React, { useEffect, useState } from "react";

import { getCalculationResults } from "~/api";
import { Modal, Button, NotificationType } from "~/components";
import { CalculationResult, CalculationType } from "~/types";

type LoadCalculationModalProps = {
    calculationType?: CalculationType;
    onNotify?: (message: string, type: NotificationType) => void;
    onClose: (calculation: CalculationResult | null) => void;
    isOpen: boolean;
}

const LoadCalculationModal: React.FC<LoadCalculationModalProps> = ({ calculationType, onNotify, onClose, isOpen }) => {
    const [calculationResults, setCalculationResults] = useState<CalculationResult[]>([]);

    useEffect(() => {
        if (!isOpen) return;

        getCalculationResults(calculationType).then((results) => {
            if (results === null) {
                onNotify?.("Unable to load calculations", "error");
                return;
            }

            setCalculationResults(results);
        });
    }, [isOpen]);

    return (
        <Modal title="Load Calculation" isOpen={isOpen} onClose={() => onClose(null)}>
            <div className="flex flex-col gap-2">
                {calculationResults.map((calculation) => (
                    <div key={calculation.id}
                        className="flex flex-row items-center justify-between border-b border-stone-200 last:border-b-0 pb-2">
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-medium text-stone-800">{calculation.name}</div>
                            <div className="text-xs text-stone-500">{calculation.calculationType}</div>
                        </div>
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={() => onClose(calculation)}
                            accessibilityLabel="Load calculation"
                        >
                            Load
                        </Button>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export { LoadCalculationModal };
