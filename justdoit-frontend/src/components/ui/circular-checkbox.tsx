import type * as React from "react"
import { Check } from "lucide-react"

interface CircularCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    checked: boolean
    onChange: () => void
}

export function CircularCheckbox({ checked, onChange, ...props }: CircularCheckboxProps) {
    return (
        <label className="inline-flex items-center">
            <input type="checkbox" className="hidden" checked={checked} onChange={onChange} {...props} />
            <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${checked ? "bg-primary border-primary" : "border-gray-300"
                    }`}
            >
                {checked && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
        </label>
    )
}