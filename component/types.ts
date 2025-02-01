export interface FilterItemProps {
  label: string;
  count: number;
}

export interface FilterSectionProps {
  title: string;
  items: FilterItemProps[];
  selectedItems: (string | number)[]; // 追加
  onFilterChange: (selectedItems: (string | number)[]) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  startItem: number;
  endItem: number;
  onPrevious: () => void;
  onNext: () => void;
}

export interface InfoRowProps {
  label: string;
  value: string;
}

export interface TagProps {
  text: string;
}

export interface BusinessCardProps {
  title: string;
  image: string;
  personInfo: {
    name: string;
    department: string;
    // documentType: string;
  };
  tags: string[];
  date: string;
  fileType: string;
}
