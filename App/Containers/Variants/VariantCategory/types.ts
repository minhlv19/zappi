export interface ButtonProps {
  isNull?: boolean;
  isAdd?: boolean;
  value: string;
  setValue?: (e: string) => void;
  isEditEnable?: boolean;

  onDelete?: () => void;
}
