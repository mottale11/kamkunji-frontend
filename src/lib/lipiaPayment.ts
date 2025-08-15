// Lipia Online M-Pesa Payment Service
// API Documentation: https://lipia-api.kreativelabske.com/api

import { LIPIA_CONFIG } from '@/config/lipia';

export interface LipiaPaymentRequest {
  phone: string;
  amount: string;
}

export interface LipiaPaymentResponse {
  message: string;
  data: {
    amount: string;
    phone: string;
    reference: string;
    CheckoutRequestID: string;
  };
}

export interface LipiaPaymentError {
  message: string;
}

export class LipiaPaymentService {
  private static readonly config = LIPIA_CONFIG;

  /**
   * Initiate M-Pesa STK push payment
   * @param phone - Phone number in format 07XXXXXXXX
   * @param amount - Amount to be paid
   * @returns Promise with payment response
   */
  static async initiatePayment(phone: string, amount: number): Promise<LipiaPaymentResponse> {
    try {
      // Validate amount
      if (amount < this.config.VALIDATION.MIN_AMOUNT || amount > this.config.VALIDATION.MAX_AMOUNT) {
        throw new Error(`Amount must be between KSh ${this.config.VALIDATION.MIN_AMOUNT} and KSh ${this.config.VALIDATION.MAX_AMOUNT}`);
      }

      // Format phone number to ensure it starts with 07
      const formattedPhone = this.formatPhone(phone);
      
      // Format amount to string as required by API
      const formattedAmount = amount.toString();

      const response = await fetch(`${this.config.API_BASE_URL}/request/stk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.API_KEY}`,
        },
        body: JSON.stringify({
          phone: formattedPhone,
          amount: formattedAmount,
        } as LipiaPaymentRequest),
      });

      if (!response.ok) {
        const errorData: LipiaPaymentError = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const paymentResponse: LipiaPaymentResponse = await response.json();
      
      // Validate response
      if (!paymentResponse.data?.CheckoutRequestID) {
        throw new Error('Invalid payment response from Lipia API');
      }

      return paymentResponse;
    } catch (error) {
      console.error('Lipia payment initiation failed:', error);
      throw error;
    }
  }

  /**
   * Check payment status using CheckoutRequestID
   * Note: This would require additional API endpoint from Lipia
   * @param checkoutRequestId - The CheckoutRequestID from payment response
   * @returns Promise with payment status
   */
  static async checkPaymentStatus(checkoutRequestId: string): Promise<any> {
    // This method would be implemented when Lipia provides a status check endpoint
    // For now, we'll rely on callbacks or manual verification
    console.log('Payment status check not yet implemented. CheckoutRequestID:', checkoutRequestId);
    return { status: 'pending', checkoutRequestId };
  }

  /**
   * Validate phone number format
   * @param phone - Phone number to validate
   * @returns boolean indicating if phone is valid
   */
  static validatePhone(phone: string): boolean {
    return this.config.VALIDATION.PHONE_REGEX.test(phone);
  }

  /**
   * Format phone number for API
   * @param phone - Raw phone number
   * @returns Formatted phone number starting with 07
   */
  static formatPhone(phone: string): string {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Ensure it starts with 07
    if (cleanPhone.startsWith('7') && cleanPhone.length === 9) {
      return `0${cleanPhone}`;
    }
    
    if (cleanPhone.startsWith('07') && cleanPhone.length === 10) {
      return cleanPhone;
    }
    
    // If it's 10 digits starting with 0, assume it's correct
    if (cleanPhone.length === 10 && cleanPhone.startsWith('0')) {
      return cleanPhone;
    }
    
    throw new Error(this.config.ERROR_MESSAGES.INVALID_PHONE);
  }

  /**
   * Get error message for common Lipia errors
   * @param errorMessage - Error message from API
   * @returns User-friendly error message
   */
  static getErrorMessage(errorMessage: string): string {
    const errorMap: Record<string, string> = {
      'invalid phone number': this.config.ERROR_MESSAGES.INVALID_PHONE,
      'Request cancelled by user': this.config.ERROR_MESSAGES.USER_CANCELLED,
      'insuccifient user balance': this.config.ERROR_MESSAGES.INSUFFICIENT_BALANCE,
      'user took too long to pay': this.config.ERROR_MESSAGES.PAYMENT_TIMEOUT,
    };

    return errorMap[errorMessage] || errorMessage;
  }
}

export default LipiaPaymentService;
