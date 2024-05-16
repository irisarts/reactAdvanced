import { Button, Wrap, WrapItem, useToast } from "@chakra-ui/react";

export function ToastStatus() {
    const toast = useToast();
    const statuses = ["Success", "Failure"]

    return (
        <Wrap>
            {statuses.map((status, i) => (
                <WrapItem key={i}>
                    <Button onClick={() =>
                        toast({
                            title: `${status} toast`,
                            status: status,
                            isClosable: true,
                        })
                    }>
                        Show {status} toast
                    </Button>
                </WrapItem>
            ))}
        </Wrap>
    )
}