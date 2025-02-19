import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"

export default function Faqs() {
    return (
        <div className="w-[80%] mx-auto mt-10 text-xl">
            <Accordion type="single" collapsible className="w-full  mr-6">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What does just do it do?</AccordionTrigger>
                    <AccordionContent>
                        Its a Task Management App that helps you keep track of your tasks.📔
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it open source ?</AccordionTrigger>
                    <AccordionContent>
                        Yes, It&apos;s open source. You can find the source code on Github. 😁
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is this official Nike Web App?</AccordionTrigger>
                    <AccordionContent>
                        No, It&apos;s not an official Nike Web App. It&apos;s just a concept
                        (tbh this is a task and project management app, not a shoe selling app 😅)

                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>And Whattttttt?</AccordionTrigger>
                    <AccordionContent>
                        <Image
                            src="https://utfs.io/f/aMMSb4aTvgRAJfwcUyf5DAwM4koZymEYihIeqcx609RjgGzN"
                            alt="Kapybara"
                            width={200}
                            height={200}
                        />

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
