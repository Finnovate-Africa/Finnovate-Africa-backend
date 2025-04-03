export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
  ASSIGNED = "assigned",
  AWAITING_SHIPMENT = "awaiting_shipment",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  RETURNED = "returned",
  DISPUTED = "disputed",
}

export enum AdminOrderStatus {
  CREATED = "created",
  DISPUTED = "disputed",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

export enum DeliveryType {
  EXPRESS = "express",
  STANDARD = "standard"
}

export enum FlagStatus {
  DISPUTE = 'DISPUTE',
  FRAUD_SUSPECTED = 'FRAUD_SUSPECTED',
  PAYMENT_ISSUE = 'PAYMENT_ISSUE',
  DELIVERY_PROBLEM = 'DELIVERY_PROBLEM',
  CUSTOMER_COMPLAINT = 'CUSTOMER_COMPLAINT',
  INVENTORY_MISMATCH = 'INVENTORY_MISMATCH',
  REFUND_REQUESTED = 'REFUND_REQUESTED',
  PENDING_INVESTIGATION = 'PENDING_INVESTIGATION',
  UNFLAGGED = ''
}

export enum TransactionType {
  CART = "cart",
  ESCROW = "escrow",
  TRANSFER = "transfer",
  PAYMENT = "payment",
  WITHDRAWAL = "withdrawal",
  REFUND = "refund",
  SALE = "sale",
  DEPOSIT = "deposit",
  NULL = "null",
}

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  SUCCESS = "success",
  FAILED = "failed",
  DISPUTED = "disputed",
  SETTLED = "settled",
  UNSETTLED = "unsettled",
}
export enum TransactionTitle {
  CHECK_OUT = "Check Out",
  ESCROW = "Escrow",
  DEPOSIT = "Deposit",
  TRANSFER = "Transfer",
}

export enum PaymentMethod {
  CARD = "card",
  BANK = "bank",
  USSD = "ussd",
  QR = "qr",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
  NULL = "null",
  ESCROW = "escrow",
  WALLET = "wallet",
}

export enum EscrowStatus {
  PENDING = "pending",
  AWAITING_ACCEPTANCE = "awaiting_acceptance",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  PROCESSING = "processing",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  FAILED = "failed",
}

export enum WithdrawalStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  FAILED = "failed",
}

export enum AdvertType {
  PRODUCT = "product",
  STORE = "store",
  BANNER = "banner",
}

export enum AdvertStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

export enum AdvertDisplayArea {
  HOME = "home",
  SEARCH = "search",
  CATEGORY = "category",
  PRODUCT = "product",
  STORE = "store",
  CART = "cart",
}

export enum ProductStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}