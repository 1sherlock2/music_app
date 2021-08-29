export interface ITabs {
  tabs: string[] | null;
  restProp: any;
  size: string;
  color: string;
  active: number;
  onClick: (index: number) => void;
  [key: string]: any;
}
