import { TransactionType, SubscriptionPlan } from '../types/marketplace';

export interface CommissionCalculation {
  baseRate: number;        // e.g. 15 (%)
  effectiveRate: number;   // after tiered discount and plan benefits
  commissionFee: number;   // THB
  sellerNetPayout: number; // THB
  tierDiscountReason: string;
  isExempt: boolean;       // free and donate are 100% exempt
}

/**
 * Calculates platform fee based on item price, transaction type, and seller subscription plan.
 * Standard Rules:
 * - Free (ฟรี) & Donate (บริจาค): 0% commission (exempt)
 * - Sell (ขาย):
 *   - Base rate: 15% for transactions < ฿1,000
 *   - ฿1,000 - ฿4,999: 13.5%
 *   - ฿5,000 - ฿19,999: 12.0%
 *   - ฿20,000+: 10.0% (Platform minimum floor)
 * - Subscription Plan Caps:
 *   - Starter (฿99): Capped at max 12% (down to 8% for high volume)
 *   - Pro (฿299): Capped at max 8% (down to 6% for high volume)
 *   - Enterprise (฿499): Flat 5% platform commission
 */
export function calculateCommission(
  price: number,
  txType: TransactionType,
  plan: SubscriptionPlan = 'free'
): CommissionCalculation {
  if (txType === 'free' || txType === 'donate' || txType === 'swap') {
    return {
      baseRate: 0,
      effectiveRate: 0,
      commissionFee: 0,
      sellerNetPayout: 0,
      tierDiscountReason: txType === 'donate' 
        ? 'ยกเว้นค่าธรรมเนียม 100% สำหรับการบริจาคเพื่อสังคม' 
        : txType === 'free' 
          ? 'ยกเว้นค่าธรรมเนียม 100% สำหรับการให้ฟรี' 
          : 'ยกเว้นค่าธรรมเนียมสำหรับการแลกเปลี่ยนสิ่งของ',
      isExempt: true
    };
  }

  if (price <= 0) {
    return {
      baseRate: 0,
      effectiveRate: 0,
      commissionFee: 0,
      sellerNetPayout: 0,
      tierDiscountReason: 'ไม่มีค่าธรรมเนียม',
      isExempt: true
    };
  }

  // Calculate volume-based base rate
  let standardRate = 15.0;
  let reason = 'อัตรามาตรฐานเริ่มต้น 15%';

  if (price >= 20000) {
    standardRate = 10.0;
    reason = 'ส่วนลดมูลค่าสูงพิเศษ (฿20,000+) ลดเหลือต่ำสุด 10%';
  } else if (price >= 5000) {
    standardRate = 12.0;
    reason = 'ส่วนลดมูลค่าปานกลาง (฿5,000+) ลดเหลือ 12%';
  } else if (price >= 1000) {
    standardRate = 13.5;
    reason = 'ส่วนลดปริมาณเริ่มต้น (฿1,000+) ลดเหลือ 13.5%';
  }

  // Apply subscription plan benefits
  let effectiveRate = standardRate;
  if (plan === 'enterprise') {
    effectiveRate = 5.0;
    reason = 'สิทธิพิเศษแพ็กเกจ Enterprise (฿499/ด.) ค่าคอมมิชชั่นคงที่เพียง 5%';
  } else if (plan === 'pro') {
    effectiveRate = Math.min(8.0, standardRate - 2.0);
    reason = `สิทธิพิเศษแพ็กเกจ Pro Circular (฿299/ด.) ลดพิเศษเหลือ ${effectiveRate}%`;
  } else if (plan === 'starter') {
    effectiveRate = Math.min(12.0, standardRate - 1.0);
    reason = `สิทธิพิเศษแพ็กเกจ Starter (฿99/ด.) ลดพิเศษเหลือ ${effectiveRate}%`;
  }

  const commissionFee = Math.round((price * (effectiveRate / 100)) * 100) / 100;
  const sellerNetPayout = Math.max(0, Math.round((price - commissionFee) * 100) / 100);

  return {
    baseRate: 15.0,
    effectiveRate,
    commissionFee,
    sellerNetPayout,
    tierDiscountReason: reason,
    isExempt: false
  };
}
