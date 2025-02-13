export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  status: boolean;
}
