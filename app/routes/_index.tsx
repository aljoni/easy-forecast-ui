import type { MetaFunction } from "@remix-run/node";
import { ComponentSize, ComponentVariant } from "~/types/ComponentInfo";
import { useSearchParams } from "@remix-run/react";
import { createSubscription, sendChargeIdRequest } from "~/api/subscription";
import { useEffect } from "react";
import { useNotifications } from "~/components/NotificationProvider";
import { Page, Card, Button, Dropdown, TextField } from "~/components";

export const meta: MetaFunction = () => {
    return [
        { title: "Easy Forecast" },
        { name: "description", content: "Manage your business forecasting with ease." },
    ];
};

export default function Index() {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has("shop") && searchParams.has("state")) {
            localStorage.setItem("shop", searchParams.get("shop")!);
            localStorage.setItem("state", searchParams.get("state")!);

            setSearchParams({});

            createSubscription("TIER1").then((resp) => {
                if (!resp) {
                    return;
                }
                window.location.href = resp.confirmationUrl;
            });
        }

        if (searchParams.has("charge_id")) {
            sendChargeIdRequest(searchParams.get("charge_id")!).then(() => {
                setSearchParams({});
            });
        }
    }, [searchParams, setSearchParams]);

    const variants = ["primary", "secondary", "success", "warning", "danger"];
    const sizes = ["xs", "sm", "md", "lg", "xl"];

    const notifications = useNotifications();

    return (
        <Page title="Easy Forecast">
            <div className="flex flex-col gap-4">
                <Card title="Notifications" className="max-w-[1000px] mx-auto">
                    <div className="flex flex-row gap-2">
                        <Button
                            variant="primary"
                            size="md"
                            accessibilityLabel="Show notification"
                            onClick={() => notifications.addNotification("Hello world!", "info")}
                        >
                            Show Info
                        </Button>

                        <Button
                            variant="success"
                            size="md"
                            accessibilityLabel="Show notification"
                            onClick={() => notifications.addNotification("Hello world!", "success")}
                        >
                            Show Success
                        </Button>

                        <Button
                            variant="warning"
                            size="md"
                            accessibilityLabel="Show notification"
                            onClick={() => notifications.addNotification("Hello world!", "warning")}
                        >
                            Show Warning
                        </Button>

                        <Button
                            variant="danger"
                            size="md"
                            accessibilityLabel="Show notification"
                            onClick={() => notifications.addNotification("Hello world!", "error")}
                        >
                            Show Error
                        </Button>
                    </div>
                </Card>

                <Card title="Dropdowns" className="max-w-[1000px] mx-auto">
                    {sizes.map((size) => (
                        <div key={`${size}-dropdowns`} className="flex flex-col gap-2 mb-8">
                            {variants.map((variant) => (
                                <div key={`${size}-${variant}`} className="flex flex-row gap-2">
                                    <Dropdown
                                        options={[
                                            { label: "Option 1", value: "option-1" },
                                            { label: "Option 2", value: "option-2" },
                                            { label: "Option 3", value: "option-3" },
                                        ]}
                                        selected="option-1"
                                        onChange={() => {
                                        }}
                                        variant={variant as ComponentVariant}
                                        size={size as ComponentSize}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </Card>

                <Card title="Buttons" className="max-w-[1000px] mx-auto">
                    {sizes.map((size) => (
                        <div key={`${size}-buttons`} className="flex flex-row gap-2 pt-2">
                            {variants.map((variant) => (
                                <Button
                                    key={`${size}-${variant}`}
                                    variant={variant as ComponentVariant}
                                    size={size as ComponentSize}
                                    accessibilityLabel={`${size} ${variant} button`}
                                >
                                    {size} {variant}
                                </Button>
                            ))}
                        </div>

                    ))}
                </Card>

                <Card title="Text Fields" className="max-w-[1000px] mx-auto">
                    {sizes.map((size) => (
                        <div key={`${size}-text-fields`} className="flex flex-col gap-2 mb-8">
                            {variants.map((variant) => (
                                <div key={`${size}-${variant}`} className="flex flex-row gap-2">
                                    <TextField
                                        label={`${size} ${variant} text field`}
                                        value="Hello"
                                        onChange={() => {
                                        }}
                                        prefix="£"
                                        suffix="%"
                                        variant={variant as ComponentVariant}
                                        inputSize={size as ComponentSize}
                                    />
                                    <TextField
                                        label={`${size} ${variant} text field`}
                                        value="Hello"
                                        onChange={() => {
                                        }}
                                        disabled
                                        variant={variant as ComponentVariant}
                                        inputSize={size as ComponentSize}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </Card>
            </div>
        </Page>
    );
}