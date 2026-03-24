import { Control, FieldValues, Path } from 'react-hook-form';

/**
 * Props for the phone input component
 */
export interface PhoneInputProps<T extends FieldValues> {
    /**
     * Control object that allow react hook form to manage the component
     */
    control: Control<T>;
    /**
     * Name of the input field
     */
    name: Path<T>;
}
