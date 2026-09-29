export interface ThaiProvince {
  nameTh: string;
  nameEn: string;
  region: 'central' | 'north' | 'northeast' | 'east' | 'west' | 'south';
}

export const THAI_PROVINCES: ThaiProvince[] = [
  // กรุงเทพและปริมณฑล / ภาคกลาง
  { nameTh: 'กรุงเทพมหานคร', nameEn: 'Bangkok', region: 'central' },
  { nameTh: 'นนทบุรี', nameEn: 'Nonthaburi', region: 'central' },
  { nameTh: 'ปทุมธานี', nameEn: 'Pathum Thani', region: 'central' },
  { nameTh: 'สมุทรปราการ', nameEn: 'Samut Prakan', region: 'central' },
  { nameTh: 'สมุทรสาคร', nameEn: 'Samut Sakhon', region: 'central' },
  { nameTh: 'นครปฐม', nameEn: 'Nakhon Pathom', region: 'central' },
  { nameTh: 'พระนครศรีอยุธยา', nameEn: 'Phra Nakhon Si Ayutthaya', region: 'central' },
  { nameTh: 'สระบุรี', nameEn: 'Saraburi', region: 'central' },
  { nameTh: 'ลพบุรี', nameEn: 'Lopburi', region: 'central' },
  { nameTh: 'สิงห์บุรี', nameEn: 'Sing Buri', region: 'central' },
  { nameTh: 'อ่างทอง', nameEn: 'Ang Thong', region: 'central' },
  { nameTh: 'ชัยนาท', nameEn: 'Chai Nat', region: 'central' },
  { nameTh: 'นครสวรรค์', nameEn: 'Nakhon Sawan', region: 'central' },
  { nameTh: 'อุทัยธานี', nameEn: 'Uthai Thani', region: 'central' },
  { nameTh: 'สุพรรณบุรี', nameEn: 'Suphan Buri', region: 'central' },
  { nameTh: 'สมุทรสงคราม', nameEn: 'Samut Songkhram', region: 'central' },
  { nameTh: 'นครนายก', nameEn: 'Nakhon Nayok', region: 'central' },

  // ภาคเหนือ
  { nameTh: 'เชียงใหม่', nameEn: 'Chiang Mai', region: 'north' },
  { nameTh: 'เชียงราย', nameEn: 'Chiang Rai', region: 'north' },
  { nameTh: 'ลำปาง', nameEn: 'Lampang', region: 'north' },
  { nameTh: 'ลำพูน', nameEn: 'Lamphun', region: 'north' },
  { nameTh: 'แม่ฮ่องสอน', nameEn: 'Mae Hong Son', region: 'north' },
  { nameTh: 'น่าน', nameEn: 'Nan', region: 'north' },
  { nameTh: 'พะเยา', nameEn: 'Phayao', region: 'north' },
  { nameTh: 'แพร่', nameEn: 'Phrae', region: 'north' },
  { nameTh: 'อุตรดิตถ์', nameEn: 'Uttaradit', region: 'north' },
  { nameTh: 'พิษณุโลก', nameEn: 'Phitsanulok', region: 'north' },
  { nameTh: 'สุโขทัย', nameEn: 'Sukhothai', region: 'north' },
  { nameTh: 'เพชรบูรณ์', nameEn: 'Phetchabun', region: 'north' },
  { nameTh: 'พิจิตร', nameEn: 'Phichit', region: 'north' },
  { nameTh: 'กำแพงเพชร', nameEn: 'Kamphaeng Phet', region: 'north' },

  // ภาคตะวันออกเฉียงเหนือ (อีสาน)
  { nameTh: 'นครราชสีมา', nameEn: 'Nakhon Ratchasima', region: 'northeast' },
  { nameTh: 'ขอนแก่น', nameEn: 'Khon Kaen', region: 'northeast' },
  { nameTh: 'อุดรธานี', nameEn: 'Udon Thani', region: 'northeast' },
  { nameTh: 'อุบลราชธานี', nameEn: 'Ubon Ratchathani', region: 'northeast' },
  { nameTh: 'บุรีรัมย์', nameEn: 'Buriram', region: 'northeast' },
  { nameTh: 'สุรินทร์', nameEn: 'Surin', region: 'northeast' },
  { nameTh: 'ศรีสะเกษ', nameEn: 'Sisaket', region: 'northeast' },
  { nameTh: 'ร้อยเอ็ด', nameEn: 'Roi Et', region: 'northeast' },
  { nameTh: 'ชัยภูมิ', nameEn: 'Chaiyaphum', region: 'northeast' },
  { nameTh: 'มหาสารคาม', nameEn: 'Maha Sarakham', region: 'northeast' },
  { nameTh: 'สกลนคร', nameEn: 'Sakon Nakhon', region: 'northeast' },
  { nameTh: 'กาฬสินธุ์', nameEn: 'Kalasin', region: 'northeast' },
  { nameTh: 'หนองคาย', nameEn: 'Nong Khai', region: 'northeast' },
  { nameTh: 'เลย', nameEn: 'Loei', region: 'northeast' },
  { nameTh: 'ยโสธร', nameEn: 'Yasothon', region: 'northeast' },
  { nameTh: 'นครพนม', nameEn: 'Nakhon Phanom', region: 'northeast' },
  { nameTh: 'มุกดาหาร', nameEn: 'Mukdahan', region: 'northeast' },
  { nameTh: 'บึงกาฬ', nameEn: 'Bueng Kan', region: 'northeast' },
  { nameTh: 'หนองบัวลำภู', nameEn: 'Nong Bua Lamphu', region: 'northeast' },
  { nameTh: 'อำนาจเจริญ', nameEn: 'Amnat Charoen', region: 'northeast' },

  // ภาคตะวันออก
  { nameTh: 'ชลบุรี', nameEn: 'Chonburi', region: 'east' },
  { nameTh: 'ระยอง', nameEn: 'Rayong', region: 'east' },
  { nameTh: 'ฉะเชิงเทรา', nameEn: 'Chachoengsao', region: 'east' },
  { nameTh: 'จันทบุรี', nameEn: 'Chanthaburi', region: 'east' },
  { nameTh: 'ปราจีนบุรี', nameEn: 'Prachinburi', region: 'east' },
  { nameTh: 'ตราด', nameEn: 'Trat', region: 'east' },
  { nameTh: 'สระแก้ว', nameEn: 'Sa Kaeo', region: 'east' },

  // ภาคตะวันตก
  { nameTh: 'กาญจนบุรี', nameEn: 'Kanchanaburi', region: 'west' },
  { nameTh: 'ราชบุรี', nameEn: 'Ratchaburi', region: 'west' },
  { nameTh: 'เพชรบุรี', nameEn: 'Phetchaburi', region: 'west' },
  { nameTh: 'ประจวบคีรีขันธ์', nameEn: 'Prachuap Khiri Khan', region: 'west' },
  { nameTh: 'ตาก', nameEn: 'Tak', region: 'west' },

  // ภาคใต้
  { nameTh: 'ภูเก็ต', nameEn: 'Phuket', region: 'south' },
  { nameTh: 'สงขลา', nameEn: 'Songkhla', region: 'south' },
  { nameTh: 'สุราษฎร์ธานี', nameEn: 'Surat Thani', region: 'south' },
  { nameTh: 'นครศรีธรรมราช', nameEn: 'Nakhon Si Thammarat', region: 'south' },
  { nameTh: 'กระบี่', nameEn: 'Krabi', region: 'south' },
  { nameTh: 'พังงา', nameEn: 'Phang Nga', region: 'south' },
  { nameTh: 'ตรัง', nameEn: 'Trang', region: 'south' },
  { nameTh: 'พัทลุง', nameEn: 'Phatthalung', region: 'south' },
  { nameTh: 'ชุมพร', nameEn: 'Chumphon', region: 'south' },
  { nameTh: 'ระนอง', nameEn: 'Ranong', region: 'south' },
  { nameTh: 'สตูล', nameEn: 'Satun', region: 'south' },
  { nameTh: 'ยะลา', nameEn: 'Yala', region: 'south' },
  { nameTh: 'ปัตตานี', nameEn: 'Pattani', region: 'south' },
  { nameTh: 'นราธิวาส', nameEn: 'Narathiwat', region: 'south' }
];

export const REGION_LABELS: Record<string, string> = {
  central: 'กรุงเทพฯ และภาคกลาง',
  north: 'ภาคเหนือ',
  northeast: 'ภาคตะวันออกเฉียงเหนือ (อีสาน)',
  east: 'ภาคตะวันออก',
  west: 'ภาคตะวันตก',
  south: 'ภาคใต้'
};
