import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

interface Props {
  value: string;
  onSetGender: (val: string) => void;
}

const RadioGroupComp = ({ value, onSetGender }: Props) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onSetGender}
      className="flex gap-2 items-center"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="MALE" id="option-one" />
        <Label htmlFor="option-one">Male</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="FEMALE" id="option-two" />
        <Label htmlFor="option-two">Female</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroupComp;
