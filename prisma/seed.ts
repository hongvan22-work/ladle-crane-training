import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const chapters = [
  {
    part: 'A',
    order: 1,
    title: 'Môi Trường Nhà Máy Thép – "Địa Ngục" Của Thiết Bị Máy Móc',
    summary: 'Hiểu 5 kẻ thù lớn nhất trong nhà máy thép: nhiệt độ cực đoan, bụi mài mòn, khí ăn mòn, rung chấn và áp lực zero-failure.',
    content: `# Chuyên Đề 1: Môi Trường Nhà Máy Thép – "Địa Ngục" Của Thiết Bị Máy Móc

Nhà máy luyện kim (Steel Mill / Meltshop) không phải là một nhà xưởng bình thường. Đây là một trong những môi trường công nghiệp khắc nghiệt nhất trên Trái Đất. Bất kỳ thiết bị nào đưa vào đây nếu thiết kế theo chuẩn công nghiệp nhẹ sẽ bị phá hủy chỉ trong vài tuần.

Để thiết kế hoặc bán được cầu trục luyện kim, chúng ta phải hiểu **5 kẻ thù lớn nhất**:

## 1. Nhiệt Độ Cực Đoan & Bức Xạ Nhiệt (Extreme Heat & Radiant Heat)

**Hiện tượng:**
- Nhiệt độ môi trường (Ambient Temp): 40°C đến 70°C ở sát mái nhà xưởng
- Bức xạ nhiệt (Radiant Heat): Khi cầu trục cẩu thùng thép lỏng ở 1.500°C – 1.600°C, bức xạ nhiệt chiếu thẳng lên bụng dầm cầu trục

**Hậu quả nếu dùng cẩu thường:**
- Cáp thép lõi đay bốc cháy, cáp giòn và đứt
- Tủ điện bị "luộc chín", biến tần nổ bo mạch

**Giải pháp bắt buộc (Key Design):**
- Hàn Tấm chắn bức xạ nhiệt (Heat Shields) dưới bụng dầm chính
- Chỉ dùng cáp thép lõi thép chịu nhiệt (IWRC)
- Phòng điện phải có vỏ cách nhiệt bông khoáng và Điều hòa công nghiệp (Heavy-duty HVAC) chạy dự phòng 1+1

## 2. Bụi Mài Mòn & Bụi Dẫn Điện (Abrasive & Conductive Dust)

**Hiện tượng:**
- Bụi xỉ kim loại rất cứng (Bụi mài mòn)
- Bụi than chì (Graphite) từ điện cực lò EAF – vật liệu dẫn điện rất tốt

**Hậu quả nếu dùng cẩu thường:**
- Bánh xe, thanh ray, vòng bi bị "ăn mòn" nhanh chóng
- Bụi than chì bay vào tủ điện hở → đoản mạch, cháy nổ

**Giải pháp bắt buộc:**
- Toàn bộ tủ điện, động cơ, vỏ camera phải đạt chuẩn IP54 đến IP66
- Phòng điện phải duy trì Áp suất dương (Positive Pressure)
- Bánh xe phải có Gạt bụi/Gạt đá (Rail Sweeps) bằng thép dày

## 3. Khí Ăn Mòn & Hơi Ẩm (Corrosive Gases & Fumes)

**Hiện tượng:** Khói từ lò luyện chứa lưu huỳnh (SO₂), oxit nitơ (NOₓ) → tạo sương axit nhẹ

**Giải pháp bắt buộc:**
- Sơn bảo vệ chống ăn mòn cấp C3, C4 hoặc C5 (EN ISO 12944)
- Dùng sơn Epoxy giàu kẽm kết hợp phủ Polyurethane
- Vỏ thiết bị nhạy cảm dùng Thép không gỉ (Stainless Steel 304/316)

## 4. Rung Chấn & Va Đập Liên Tục (Heavy Shock & Vibration)

**Hiện tượng:** Mỗi khi thả gầu ngoạm hoặc dừng đột ngột → toàn bộ kết cấu chịu lực xoắn và quán tính cực lớn

**Giải pháp bắt buộc:**
- Thiết kế theo chế độ Q4 / Class S8, S9 (EN 13001) – tương đương A8/M8 trong FEM 1.001
- Dùng Gối đỡ giảm chấn Polyurethane (Cellular Buffers)
- Tủ điện phải có hệ thống đế giảm chấn (Anti-vibration mounts)

## 5. Áp Lực "Không Được Phép Sai Sót" (Zero-Failure Tolerance)

**Hiện tượng:**
- Nhà máy thép hoạt động 24/7. Cẩu dừng 1 giờ = nhà máy mất hàng nghìn Đô la
- Rơi 150 tấn thép lỏng → Thảm họa nhân mạng và phá hủy nhà máy

**Giải pháp bắt buộc:**
- Triết lý Dự phòng (Redundancy): Cáp kép, Phanh kép, Biến tần 1 Run + 1 Standby
- Hệ thống CMS chẩn đoán lỗi chuyên sâu

---

## Case Study

> **Câu hỏi:** Tại sao khách hàng yêu cầu chuyển từ tủ điện khung hở (Open Chassis) sang tủ kín (IP54 Cubicles)?
>
> **Trả lời:** Vì bụi dẫn điện (bụi graphite) sẽ làm chập mạch khung hở, và để an toàn cho thợ cơ khí không bị điện giật.`,
    quizzes: [
      {
        question: 'Nhiệt độ môi trường trong nhà máy thép (ở vị trí cầu trục hoạt động) dao động trong khoảng nào?',
        options: ['20°C – 35°C', '40°C – 70°C', '80°C – 100°C', '100°C – 150°C'],
        correctAnswer: 1,
        explanation: 'Nhà xưởng thép có nhiệt độ môi trường 40°C–70°C ở sát mái nhà, nơi cầu trục hoạt động, do nhiệt bốc lên cao từ lò luyện.'
      },
      {
        question: 'Loại bụi nào nguy hiểm nhất trong nhà máy thép vì có khả năng gây đoản mạch điện?',
        options: ['Bụi xỉ kim loại', 'Bụi than chì (Graphite)', 'Bụi xi măng', 'Bụi cát mài'],
        correctAnswer: 1,
        explanation: 'Bụi than chì (Graphite) sinh ra từ điện cực lò EAF là vật liệu dẫn điện rất tốt. Khi bám lên bo mạch điện sẽ gây đoản mạch (short-circuit).'
      },
      {
        question: 'Tiêu chuẩn IP tối thiểu cho tủ điện trong nhà máy thép là bao nhiêu?',
        options: ['IP20', 'IP44', 'IP54', 'IP66'],
        correctAnswer: 2,
        explanation: 'Toàn bộ tủ điện, động cơ, vỏ camera trong nhà máy thép phải đạt chuẩn tối thiểu IP54 đến IP66 để chống bụi hoàn toàn.'
      }
    ]
  },
  {
    part: 'A',
    order: 2,
    title: 'Bản Đồ Cầu Trục Trong Nhà Máy Thép (The Steel Mill Crane Map)',
    summary: 'Khám phá 5 khu vực và loại cầu trục tương ứng trong vòng đời sản xuất thép từ phế liệu đến thành phẩm.',
    content: `# Chuyên Đề 2: Bản Đồ Cầu Trục Trong Nhà Máy Thép

Nhà máy luyện thép không dùng sức người để bưng bê. Mọi sự dịch chuyển vật chất đều phụ thuộc 100% vào hệ thống cầu trục. Hãy đi theo dòng chảy của thép để xem mặt mũi từng loại cẩu.

## Bước 1: Khu Vực Bãi Phế Liệu (Scrap Yard)

**Vật liệu:** Sắt thép vụn (Scrap) – Lạnh, bẩn, lộ thiên

- **Loại cầu trục:** Cầu trục gắp phế liệu (Scrap Handling Crane)
- **Thiết bị mang tải:** Mâm từ (Nam châm điện - Magnet) hoặc Gầu ngoạm (Grab/Bucket)
- **Nhiệm vụ:** Nhặt sắt vụn từ bãi tập kết, thả vào các giỏ nạp liệu (Scrap Baskets)
- **Đặc thù:** Hoạt động liên tục tốc độ cao, chịu va đập lớn khi gầu ngoạm đập xuống đống phế liệu

## Bước 2: Khu Vực Nạp Liệu Lò EAF (Charging Area)

**Vật liệu:** Giỏ phế liệu khổng lồ (Scrap Basket)

- **Loại cầu trục:** EAF Charging Crane / Loading Crane (Cẩu 230/150T – POSCO)
- **Thiết bị mang tải:** Móc cẩu lá (Laminated hook) đôi + Móc phụ
- **Nhiệm vụ:** Cẩu giỏ phế liệu hàng trăm tấn, di chuyển đến miệng Lò hồ quang điện (EAF), lật đổ phế liệu vào lò
- **Đặc thù:** Phải có Đồng tốc điện tử (Tandem Hoisting) giữa móc chính và móc phụ

## Bước 3: Khu Vực Lò Luyện & Rót Thép (Meltshop & Teeming Area)

**Vật liệu:** Thép lỏng (Molten Steel) ở 1.600°C

- **Loại cầu trục:** **Ladle Crane / Teeming Crane** – "Bố già" của các loại cẩu
- **Thiết bị mang tải:** Dầm đòn gánh (Lifting beam) với móc J-hook/Laminated hook đặc biệt
- **Nhiệm vụ:** Hứng thép lỏng từ lò EAF, mang sang lò tinh luyện (Ladle Furnace), rót vào Máy đúc liên tục (CCM)
- **Đặc thù BẮT BUỘC:**
  - Phải có Cơ cấu Dự phòng (Redundancy) – Dual-rope reeving
  - Có Phanh khẩn cấp (Emergency Brake) kẹp trực tiếp trên vành tang cuốn
  - Kết cấu 4 dầm (4-Girder layout): 2 dầm ngoài cho xe con chính, 2 dầm trong cho xe con phụ

## Bước 4: Khu Vực Đúc & Xử Lý Phôi (Casting & Billet Handling)

**Vật liệu:** Phôi thép (Billet/Slab) đỏ rực 800°C – 1.000°C

- **Loại cầu trục:** Cầu trục gắp phôi (Billet/Slab Handling Crane)
- **Thiết bị mang tải:** Nam châm điện chịu nhiệt hoặc Kẹp cơ khí/thủy lực
- **Đặc thù:** Nam châm phải có hệ thống pin dự phòng (UPS/Battery Backup) 15–20 phút

## Bước 5: Khu Vực Cán & Kho Thành Phẩm (Rolling Mill & Coil Storage)

**Vật liệu:** Cuộn thép (Coils), thép tấm – Đã nguội

- **Loại cầu trục:** Cầu trục thành phẩm (Coil/Product Handling Crane)
- **Thiết bị mang tải:** Móc chữ C (C-Hook) hoặc Kẹp cuộn thép dẫn động bằng động cơ
- **Đặc thù:** Cần độ chính xác cao, thường có Anti-sway và Định vị tự động (WMS)

---

## Case Study

> **Câu hỏi:** Trong 5 khu vực, cẩu ở khu vực nào có rủi ro pháp lý và đền bù cao nhất?
>
> **Trả lời:** Bước 3 – Ladle Crane. Rơi 150 tấn thép lỏng ở 1600°C sẽ gây nổ bốc hơi (Steam explosion) nếu gặp nước, phá hủy toàn bộ thiết bị và đe dọa sinh mạng công nhân.`,
    quizzes: [
      {
        question: 'Ladle Crane hoạt động ở khu vực nào trong nhà máy thép?',
        options: ['Khu vực bãi phế liệu', 'Khu vực nạp liệu lò EAF', 'Khu vực lò luyện & rót thép', 'Khu vực kho thành phẩm'],
        correctAnswer: 2,
        explanation: 'Ladle Crane (cầu trục rót thép) hoạt động ở Bước 3 – khu vực lò luyện và rót thép, nơi xử lý thép lỏng ở 1.600°C.'
      },
      {
        question: 'Vì sao nam châm điện trên cầu trục gắp phôi cần có hệ thống pin dự phòng (UPS)?',
        options: ['Để tiết kiệm điện', 'Để tránh rơi phôi khi mất điện đột ngột', 'Để tăng lực từ', 'Để giảm nhiệt độ'],
        correctAnswer: 1,
        explanation: 'Nếu mất điện lưới đột ngột, nam châm không được nhả phôi. Pin dự phòng 15–20 phút đảm bảo phôi không rơi xuống đất gây tai nạn.'
      },
      {
        question: 'Cầu trục nạp liệu lò EAF (Charging Crane) cần có tính năng gì đặc biệt khi vận hành hai móc cẩu?',
        options: ['Chống lắc (Anti-sway)', 'Đồng tốc điện tử (Tandem Hoisting)', 'Định vị GPS', 'Cáp dự phòng kép'],
        correctAnswer: 1,
        explanation: 'Cần có Đồng tốc điện tử (Tandem Hoisting) giữa móc chính và móc phụ để giữ giỏ phế liệu thăng bằng khi di chuyển.'
      }
    ]
  },
  {
    part: 'B',
    order: 3,
    title: 'Giải Mã Tiêu Chuẩn FEM 1.001 Cho Cầu Trục Hạng Nặng',
    summary: 'Tại sao cùng sức nâng 150 tấn nhưng giá cầu trục nhà máy thường là 5 tỷ, còn Ladle Crane là 20 tỷ? Câu trả lời nằm ở FEM 1.001.',
    content: `# Chuyên Đề 3: Giải Mã Tiêu Chuẩn FEM 1.001 Cho Cầu Trục Hạng Nặng

Tại sao cùng cẩu được 150 tấn, nhưng cầu trục nhà máy (bình thường) giá chỉ 5 tỷ, trong khi cầu trục rót thép lỏng giá lên tới 20 tỷ?

**Sự khác biệt không nằm ở "Sức nâng" (Static Strength), mà nằm ở "Sức bền mỏi" (Fatigue Life).**

Tiêu chuẩn FEM 1.001 ra đời để lượng hóa sự hao mòn này.

## Hai Tham Số Cốt Lõi

Để phân loại một chiếc cầu trục theo FEM, phải xác định 2 tham số:
1. **Class of Utilization (U):** Tần suất sử dụng (Làm việc nhiều hay ít?)
2. **Load Spectrum (Q hoặc L):** Phổ tải trọng (Nâng hàng nặng hay nhẹ?)

## Bước 1: Tính Tần Suất Sử Dụng (Utilization Class - U)

**Định nghĩa:** Tổng số Chu kỳ làm việc (Operating Cycles) trong suốt vòng đời thiết kế

> **1 chu kỳ** = Nhấc tải → Di chuyển → Hạ tải → Chạy không tải về vị trí ban đầu

**Bảng phân loại FEM 1.001:**
| Class | Số chu kỳ | Ứng dụng |
|-------|-----------|----------|
| U0–U3 | ≤ 125.000 | Cẩu bảo trì trạm bơm, nhà máy điện |
| U4–U5 | ≤ 500.000 | Cẩu xưởng cơ khí, lắp ráp nhẹ |
| U6–U7 | ≤ 2.000.000 | Cẩu kho bãi, cảng nhỏ |
| U8–U9 | > 2.000.000 | **Nhà máy thép, Cảng biển lớn** |

## Bước 2: Tính Phổ Tải Trọng (Load Spectrum Class - Q)

**Công thức FEM:**

$$K_p = \sum \left(\frac{C_i}{C_{total}} \times \left(\frac{P_i}{P_{max}}\right)^3\right)$$

**Trong đó:**
- C_i: Số chu kỳ cẩu ở mức tải P_i
- C_total: Tổng số chu kỳ
- P_i: Tải trọng thực tế đang cẩu
- P_max: Sức nâng tối đa thiết kế (Safe Working Load - SWL)

**Phân nhóm Phổ tải trọng:**
| Nhóm | Kp | Đặc điểm |
|------|----|----------|
| Q1 – Nhẹ (Light) | ≤ 0.125 | Hầu như cẩu hàng rất nhẹ |
| Q2 – Trung bình | 0.125–0.25 | Cẩu hàng vừa phải |
| Q3 – Nặng (Heavy) | 0.25–0.5 | Cẩu hàng nặng thường xuyên |
| Q4 – Rất nặng | 0.5–1.0 | **Gần như lần nào cũng cẩu max tải** |

## Bước 3: Xác Định Nhóm Cầu Trục (Crane Group)

Kết hợp U và Q → Nhóm làm việc (A1 đến A8):

| | Q1 | Q2 | Q3 | Q4 |
|-|----|----|----|----|
| U0–U3 | A1 | A1 | A2 | A3 |
| U4–U5 | A2 | A3 | A4 | A5 |
| U6–U7 | A4 | A5 | A6 | A7 |
| **U8–U9** | A6 | A7 | **A8** | **A8** |

**Ladle Crane = U9 + Q4 = A8** – Nhóm làm việc nặng nhất!

## Tại Sao A8 Đắt Hơn A5 Đến 4x?

- **Dầm chính:** Tính toán mỏi với 2.000.000+ chu kỳ → tiết diện lớn gấp đôi
- **Hộp số:** Phải dùng loại Heavy-duty với hệ số dự phòng tải cao hơn
- **Cáp thép:** Phải dùng cáp xoắn kép lõi thép (IWRC), thay định kỳ
- **Phanh:** Phải có phanh kép, kiểm định từng 6 tháng
- **Toàn bộ kết cấu:** Được chứng nhận bởi TÜV/Bureau Veritas`,
    quizzes: [
      {
        question: 'Điều gì quyết định sự chênh lệch giá giữa cầu trục thường và Ladle Crane cùng sức nâng?',
        options: ['Sức nâng (Static Strength)', 'Sức bền mỏi (Fatigue Life)', 'Tốc độ di chuyển', 'Chiều dài khẩu độ'],
        correctAnswer: 1,
        explanation: 'Sự khác biệt không nằm ở sức nâng mà ở sức bền mỏi (Fatigue Life). FEM 1.001 lượng hóa sự hao mòn theo thời gian dùng liên tục.'
      },
      {
        question: 'Ladle Crane trong nhà máy thép thuộc nhóm làm việc nào theo FEM 1.001?',
        options: ['A3', 'A5', 'A6', 'A8'],
        correctAnswer: 3,
        explanation: 'Ladle Crane = U9 (> 2 triệu chu kỳ) + Q4 (gần như lần nào cũng cẩu max tải) = Nhóm A8 – nhóm làm việc nặng nhất theo FEM 1.001.'
      },
      {
        question: '1 chu kỳ làm việc của cầu trục theo FEM được tính như thế nào?',
        options: ['Chỉ tính khi có tải', 'Nhấc tải → Di chuyển → Hạ tải → Chạy không tải về vị trí ban đầu', 'Mỗi giờ hoạt động', 'Mỗi lần khởi động'],
        correctAnswer: 1,
        explanation: '1 chu kỳ = Nhấc tải → Di chuyển → Hạ tải → Chạy không tải về vị trí ban đầu. Tổng số chu kỳ trong vòng đời quyết định Class U.'
      }
    ]
  },
  {
    part: 'C',
    order: 4,
    title: 'Giải Mã Cấu Trúc Dầm (Girder Layout) Của Ladle Crane',
    summary: 'Tại sao Ladle Crane cần 4 dầm thay vì 2 dầm thông thường? Phân tích kiến trúc đặc biệt của cầu trục rót thép.',
    content: `# Chuyên Đề 4: Giải Mã Cấu Trúc Dầm (Girder Layout) Của Ladle Crane

## Tại Sao Cần 4 Dầm?

Cầu trục thông thường chỉ cần 2 dầm chính (2-Girder Bridge). Nhưng Ladle Crane đặc biệt ở chỗ phải thực hiện **2 thao tác đồng thời và độc lập**:

1. **Xe con chính (Main Trolley):** Nâng hạ toàn bộ thùng thép lỏng
2. **Xe con phụ (Aux Trolley):** Lật nghiêng (Tilting) thùng thép để rót

→ Hai xe con này không thể chạy trên cùng 1 cặp ray → Cần **4 dầm riêng biệt**.

## Cấu Trúc 4 Dầm Chi Tiết

### Nhìn Từ Mặt Cắt Ngang:

\`\`\`
|  Dầm 1  |              |  Dầm 4  |   ← 2 dầm NGOÀI (cao)
   [Main Trolley chạy trên đây]
          |  Dầm 2  |  Dầm 3  |       ← 2 dầm TRONG (thấp hơn)
             [Aux Trolley chạy bên dưới]
\`\`\`

### Đặc Điểm Từng Cặp Dầm:

**Dầm ngoài (Outer Girders – Dầm 1 & 4):**
- Cao hơn và chịu tải chính
- Main Trolley chạy trên đây
- Chịu toàn bộ trọng lượng thùng thép lỏng (150–320 tấn)
- Tính toán theo nhóm A8/FEM 1.001

**Dầm trong (Inner Girders – Dầm 2 & 3):**
- Thấp hơn, luồn bên dưới Main Trolley
- Aux Trolley chạy trên đây để tiếp cận vào ngõng (Trunnion) thùng rót
- Thiết kế để chịu mô-men lật (Tilting Moment) khi rót thép

## Hệ Thống Dầm Đầu Dầm (End Trucks / Bogies)

Mỗi đầu cầu trục có **4 bánh xe (hay nhiều hơn)** trên mỗi ray do tải trọng cực lớn:

- **Bánh xe đơn (Single Wheel):** Cầu trục thường ≤ 50 tấn
- **Bánh xe đôi (Double/Tandem Wheels):** Ladle Crane → phân tải đồng đều lên ray
- **Bogies (Cụm bánh xe):** Ladle Crane siêu lớn → Bogies 4–8 bánh xe/mỗi đầu

## Vì Sao Phải Tính Toán Tải Lên Ray Cẩn Thận?

Áp lực bánh xe lên ray (Wheel Load) quyết định:
- Kích thước tiết diện ray (A45, A55, A75, A100, A120...)
- Cấu trúc khung nhà xưởng (phải đủ chịu lực)
- Chu kỳ thay ray (vì ray cũng bị mài mòn theo A8)

> **Ví dụ thực tế:** Ladle Crane 250 tấn có thể tạo áp lực 80–120 tấn/bánh xe lên ray. Ray A120 (120kg/m) là loại nặng nhất thường dùng cho ứng dụng này.`,
    quizzes: [
      {
        question: 'Ladle Crane cần 4 dầm (4-Girder) thay vì 2 dầm thông thường vì lý do gì?',
        options: [
          'Để tăng sức nâng',
          'Để Main Trolley và Aux Trolley hoạt động độc lập trên ray riêng biệt',
          'Để tăng tốc độ di chuyển',
          'Để giảm rung chấn'
        ],
        correctAnswer: 1,
        explanation: 'Main Trolley (nâng hạ) và Aux Trolley (lật thùng rót) cần hoạt động độc lập, không thể dùng chung ray → cần 4 dầm riêng biệt.'
      },
      {
        question: 'Aux Trolley (xe con phụ) có nhiệm vụ gì trong Ladle Crane?',
        options: [
          'Nâng hạ thùng thép lỏng',
          'Lật nghiêng (Tilting) thùng thép để rót',
          'Chạy không tải để cân bằng',
          'Kiểm soát tốc độ di chuyển'
        ],
        correctAnswer: 1,
        explanation: 'Aux Trolley đảm nhiệm việc lật nghiêng (Tilting) thùng rót (Ladle) để rót thép lỏng vào khuôn của Máy đúc liên tục (CCM).'
      }
    ]
  },
  {
    part: 'C',
    order: 5,
    title: 'Cơ Cấu Nâng Hạ Dự Phòng (Redundant Kinematics) – "Bảo Hiểm Sinh Tử"',
    summary: 'Cơ chế an toàn bắt buộc khi 1 sợi cáp đứt, toàn bộ tải trọng vẫn được giữ nguyên. Tại sao đây là yêu cầu không thể thiếu với Ladle Crane.',
    content: `# Chuyên Đề 5: Cơ Cấu Nâng Hạ Dự Phòng (Redundant Kinematics)

## Tại Sao Gọi Là "Bảo Hiểm Sinh Tử"?

Giả sử cầu trục đang cẩu thùng thép lỏng 150 tấn ở độ cao 15m, ngay trên đầu 20 công nhân đang làm việc bên dưới. Nếu 1 sợi cáp đứt:

**Không có dự phòng:** Toàn bộ 150 tấn thép lỏng 1.600°C rơi tự do → Nổ bốc hơi, phá hủy nhà máy

**Có dự phòng:** Cáp còn lại giữ tải → Vẫn nguy hiểm nhưng không thảm họa tức thì → Có thời gian sơ tán

→ **Đây không phải tùy chọn (optional) mà là bắt buộc (mandatory) theo EN 13001-3-2.**

## Dual-Rope Reeving – Hệ Thống Cáp Kép

### Nguyên Lý Hoạt Động:

\`\`\`
     [Tang cuốn 1]    [Tang cuốn 2]
          |                 |
     [Cáp số 1]        [Cáp số 2]
          |                 |
     [Ròng rọc 1]    [Ròng rọc 2]
          \\               /
           [Dầm đòn gánh]
                 |
           [Thùng thép lỏng]
\`\`\`

**Điểm mấu chốt:** Mỗi cáp phải **độc lập hoàn toàn** từ tang cuốn đến điểm móc. Không được dùng chung ròng rọc hoặc trục.

### Tiêu Chuẩn Thiết Kế Cho Cáp Dự Phòng:

- Mỗi cáp đơn phải chịu được **100% tải trọng thiết kế** (không phải 50%)
- Hệ số an toàn cáp: Tối thiểu **5:1** (EN 13001) → Ladle Crane thường dùng **6:1 hoặc 8:1**
- Cáp phải là loại **IWRC (Independent Wire Rope Core)** – lõi thép, không dùng lõi đay

## Redundant Braking – Phanh Dự Phòng

Không chỉ cáp, hệ thống phanh cũng phải có dự phòng:

### Phanh Làm Việc (Service Brake):
- Phanh đĩa/guốc tác động khi dừng bình thường
- Giữ tải khi mất điện
- Kiểm định mỗi 6 tháng

### Phanh Khẩn Cấp (Emergency Brake / Safety Brake):
- Kẹp trực tiếp lên vành tang cuốn (Drum)
- Chỉ kích hoạt khi:
  - Phát hiện tốc độ hạ tải vượt ngưỡng (Overspeed)
  - Đứt cáp (Rope Breakage Detector)
  - Lỗi biến tần nghiêm trọng
- **Không bao giờ dùng để dừng thường** – chỉ dành cho tình huống khẩn cấp

## Redundant Drive – Truyền Động Dự Phòng

**Cấu hình 1 Run + 1 Standby:**
- Biến tần 1 (VFD-A): Đang chạy
- Biến tần 2 (VFD-B): Chờ nóng (Hot Standby)
- Nếu VFD-A lỗi → Chuyển sang VFD-B trong vài giây, không dừng sản xuất

**Động cơ dự phòng:**
- Với Ladle Crane siêu lớn: 2 động cơ trên cùng 1 hộp số (Dual Motor Drive)
- Nếu 1 động cơ cháy, cơ cấu vẫn hoạt động với tốc độ giảm 50%`,
    quizzes: [
      {
        question: 'Theo tiêu chuẩn, mỗi sợi cáp trong hệ thống Dual-Rope của Ladle Crane phải chịu được bao nhiêu % tải trọng?',
        options: ['50% tải trọng', '75% tải trọng', '100% tải trọng', '125% tải trọng'],
        correctAnswer: 2,
        explanation: 'Mỗi cáp đơn phải chịu được 100% tải trọng thiết kế (không phải 50%). Đây là nguyên tắc dự phòng thực sự: nếu 1 cáp đứt, cáp còn lại giữ được toàn bộ tải.'
      },
      {
        question: 'Phanh khẩn cấp (Emergency Brake) trên Ladle Crane được kích hoạt trong trường hợp nào?',
        options: [
          'Mỗi khi dừng bình thường',
          'Khi phát hiện overspeed, đứt cáp, hoặc lỗi biến tần nghiêm trọng',
          'Khi vượt quá khẩu độ làm việc',
          'Khi nhiệt độ môi trường vượt 60°C'
        ],
        correctAnswer: 1,
        explanation: 'Emergency Brake chỉ kích hoạt khi: phát hiện tốc độ hạ tải vượt ngưỡng (Overspeed), đứt cáp, hoặc lỗi biến tần nghiêm trọng. Không dùng cho dừng thường.'
      }
    ]
  },
  {
    part: 'C',
    order: 6,
    title: 'Hệ Thống Phanh An Toàn Tuyệt Đối – "Chốt Chặn Cuối Cùng"',
    summary: 'Tổng quan về 3 lớp phanh bảo vệ trong Ladle Crane và tiêu chuẩn kiểm định định kỳ để đảm bảo zero-failure.',
    content: `# Chuyên Đề 6: Hệ Thống Phanh An Toàn Tuyệt Đối

## Triết Lý "3 Lớp Phanh"

Ladle Crane không chấp nhận thất bại. Vì vậy hệ thống phanh được thiết kế theo triết lý **Defense in Depth (Phòng thủ theo chiều sâu)**:

\`\`\`
Lớp 1: BIẾN TẦN (VFD) → Giảm tốc có kiểm soát
   ↓ (nếu VFD lỗi)
Lớp 2: PHANH LÀM VIỆC (Service Brake) → Giữ tải an toàn
   ↓ (nếu Service Brake lỗi hoặc tốc độ vượt ngưỡng)
Lớp 3: PHANH KHẨN CẤP (Emergency/Safety Brake) → "Chốt chặn cuối cùng"
\`\`\`

## Lớp 1: Biến Tần (VFD – Variable Frequency Drive)

**Vai trò:** Kiểm soát tốc độ động cơ → kiểm soát tốc độ nâng hạ

**Ưu điểm:**
- Dừng mượt mà (Smooth Stop) – không giật cáp
- Giảm tốc có kiểm soát trước khi phanh cơ học ăn vào
- Có thể lập trình tốc độ tối đa và gia tốc/giảm tốc

**Điểm yếu:** Phụ thuộc điện → cần phanh cơ học làm backup

## Lớp 2: Phanh Làm Việc (Service Brake / Working Brake)

**Loại phổ biến:** Phanh đĩa điện từ (Electromagnetic Disc Brake)

**Nguyên lý:**
- **Bình thường (có điện):** Nam châm điện hút → nhả phanh → cơ cấu hoạt động
- **Mất điện:** Lò xo đẩy → phanh ăn vào → giữ tải (Fail-Safe Design)

**Yêu cầu với Ladle Crane:**
- Phanh phải có **hệ số giữ tải ≥ 1.5x** trọng lượng tải thiết kế
- Phải chịu được nhiệt độ phanh cao khi dừng khẩn cấp
- Kiểm tra ma sát và độ mòn má phanh mỗi **3 tháng**

## Lớp 3: Phanh Khẩn Cấp (Emergency Brake / Safety Brake)

**Đây là "chốt chặn cuối cùng"**

**Vị trí lắp:** Kẹp trực tiếp vào **vành tang cuốn cáp (Drum)**

**Nguyên lý hoạt động:**
- Cảm biến tốc độ (Encoder) theo dõi liên tục tốc độ hạ tải
- Nếu tốc độ vượt **115–125%** tốc độ định mức → Safety Brake kích hoạt ngay lập tức
- Phanh kẹp tang → tải dừng lại trong vài giây

**Điều kiện kích hoạt khác:**
- Rope Breakage Detector (Cảm biến đứt cáp) → báo hiệu ngay
- Lỗi nghiêm trọng từ Safety PLC
- Nút Emergency Stop của người vận hành

## Kiểm Định Định Kỳ (Periodic Testing)

| Hạng mục | Tần suất | Phương pháp |
|----------|----------|-------------|
| Test phanh làm việc | Hàng tháng | Nâng tải 100% SWL, kiểm tra độ trượt |
| Test Emergency Brake | Mỗi 6 tháng | Mô phỏng Overspeed, đo quãng đường dừng |
| Kiểm tra má phanh | Mỗi 3 tháng | Đo độ dày, thay khi ≤ 50% ban đầu |
| Kiểm tra Encoder | Mỗi tháng | So sánh với tốc độ lý thuyết |
| Đại tu phanh | Mỗi năm | Tháo rời, làm sạch, thay phụ tùng |`,
    quizzes: [
      {
        question: 'Phanh làm việc (Service Brake) trên Ladle Crane hoạt động theo nguyên lý Fail-Safe. Điều này có nghĩa là gì?',
        options: [
          'Phanh tự động khi có tải nặng',
          'Phanh ăn vào khi mất điện, nhả ra khi có điện',
          'Phanh chỉ hoạt động khi người vận hành nhấn nút',
          'Phanh tự kích hoạt khi nhiệt độ cao'
        ],
        correctAnswer: 1,
        explanation: 'Fail-Safe: Bình thường (có điện) → nam châm hút → nhả phanh. Mất điện → lò xo đẩy → phanh ăn vào → giữ tải. Đây là thiết kế an toàn mặc định.'
      },
      {
        question: 'Ở ngưỡng tốc độ nào (so với tốc độ định mức) thì Emergency Brake tự động kích hoạt?',
        options: ['100%', '110%', '115–125%', '150%'],
        correctAnswer: 2,
        explanation: 'Emergency Brake kích hoạt khi tốc độ hạ tải vượt 115–125% tốc độ định mức. Đây là ngưỡng Overspeed được cài đặt trên Safety PLC.'
      }
    ]
  },
  {
    part: 'D',
    order: 7,
    title: 'Hệ Thống Điện & Điều Khiển – "Bộ Não Trong Lò Bát Quái"',
    summary: 'Phân tích kiến trúc điều khiển PLC Safety, biến tần, và mạng truyền thông trong Ladle Crane hoạt động 24/7.',
    content: `# Chuyên Đề 10: Hệ Thống Điện & Điều Khiển

## Tổng Quan Kiến Trúc Điều Khiển

Không giống cầu trục thường chỉ có relay và contactor, Ladle Crane yêu cầu kiến trúc điều khiển **3 tầng**:

\`\`\`
Tầng 3: HMI / SCADA (Giám sát từ phòng điều khiển trung tâm)
         ↕ (Ethernet / PROFINET)
Tầng 2: Safety PLC (Xử lý logic an toàn + Quản lý trạng thái)
         ↕ (PROFIBUS / PROFINET)
Tầng 1: Biến Tần (VFD) + I/O Modules (Điều khiển động cơ)
\`\`\`

## Biến Tần (Variable Frequency Drive – VFD)

**Vai trò:** Điều khiển tốc độ và mô-men động cơ

**Yêu cầu đặc biệt cho Ladle Crane:**
- **Chế độ Hoist Application:** Biến tần phải có chức năng chống trơn trượt (Anti-rollback) khi mang tải lớn
- **Safe Torque Off (STO):** Chức năng an toàn tích hợp – ngắt mô-men ngay lập tức khi có lệnh từ Safety PLC mà không cần ngắt nguồn hoàn toàn
- **Dynamic Braking:** Điện năng sinh ra khi hạ tải được đưa về lưới điện hoặc điện trở tản nhiệt

**Nhãn hàng phổ biến:** ABB ACS880, Siemens SINAMICS G120, Danfoss FC302

## Safety PLC – "Bộ Não An Toàn"

**Khác gì PLC thường?**
- PLC thường: Xử lý logic → nếu PLC lỗi, không biết đầu ra là gì
- **Safety PLC (SIL2/SIL3):** Tự chẩn đoán bản thân → nếu phát hiện lỗi nội bộ → tự chuyển về trạng thái an toàn

**Chức năng Safety PLC trong Ladle Crane:**
- Giám sát tốc độ hạ tải (kích hoạt Emergency Brake khi overspeed)
- Giám sát tải trọng (Load Cell) – chặn nâng quá SWL
- Quản lý hệ thống khóa liên động (Interlocking) với các thiết bị khác
- Ghi log tất cả sự kiện an toàn (Event Log)

## Hệ Thống Cấp Nguồn Cho Cabin & Tủ Điện

**Cáp cấp nguồn di động:**
- Ladle Crane di chuyển dọc theo nhà xưởng → dây điện không thể cố định
- Dùng **Cáp cuộn (Cable Reel / Festoon System)** – cuộn/nhả dây theo chuyển động

**Yêu cầu cáp trong nhà máy thép:**
- Vỏ cáp: Cao su chịu nhiệt (EPR/XLPE) hoặc Silicon
- Chống bức xạ nhiệt: Bọc thêm lớp nhôm phản xạ
- Chịu uốn liên tục: Minimum Bending Radius thấp, tuổi thọ uốn > 1 triệu lần

## Phòng Điện (E-Room) – Trái Tim Của Hệ Thống

**Phòng điện trên cầu trục** (chạy theo cầu trục):
- Kín hoàn toàn (IP54 tối thiểu)
- Điều hòa công nghiệp dự phòng 1+1 (nếu cái chính hỏng, cái dự phòng tự chạy)
- Áp suất dương (Positive Pressure) để bụi không vào
- Hệ thống chữa cháy tự động (FM200/Novec) nếu yêu cầu của khách hàng`,
    quizzes: [
      {
        question: 'Chức năng "Safe Torque Off (STO)" trên biến tần Ladle Crane có tác dụng gì?',
        options: [
          'Tắt hoàn toàn nguồn điện cấp vào biến tần',
          'Ngắt mô-men động cơ ngay lập tức mà không cần ngắt nguồn hoàn toàn',
          'Giảm tốc độ về 0 từ từ',
          'Kích hoạt phanh cơ học'
        ],
        correctAnswer: 1,
        explanation: 'STO (Safe Torque Off) ngắt mô-men động cơ ngay lập tức khi có lệnh từ Safety PLC, mà không cần ngắt toàn bộ nguồn điện. Đây là chức năng an toàn tích hợp trong biến tần.'
      },
      {
        question: 'Safety PLC khác PLC thông thường ở điểm gì quan trọng nhất?',
        options: [
          'Safety PLC xử lý nhanh hơn',
          'Safety PLC có nhiều đầu vào/ra hơn',
          'Safety PLC tự chẩn đoán bản thân và chuyển về trạng thái an toàn khi phát hiện lỗi nội bộ',
          'Safety PLC không cần lập trình'
        ],
        correctAnswer: 2,
        explanation: 'Safety PLC (SIL2/SIL3) có khả năng tự chẩn đoán. Nếu phát hiện lỗi nội bộ, nó tự chuyển về trạng thái an toàn. PLC thường không có khả năng này.'
      }
    ]
  },
  {
    part: 'E',
    order: 8,
    title: 'Hệ Thống Chống Lắc (Anti-Sway) – Kiểm Soát Con Lắc Khổng Lồ',
    summary: 'Kỹ thuật kiểm soát dao động vật lý của tải trọng hàng trăm tấn khi di chuyển – từ Input Shaping đến Close-Loop Feedback.',
    content: `# Chuyên Đề 11: Hệ Thống Chống Lắc (Anti-Sway)

## Vấn Đề: Tại Sao Tải Bị Lắc?

Khi xe con cầu trục gia tốc hoặc giảm tốc, thùng thép lỏng (như con lắc khổng lồ) sẽ tiếp tục di chuyển theo quán tính → **lắc qua lại**.

**Với Ladle Crane:**
- Tải trọng: 150–320 tấn
- Chiều dài cáp: 10–20m
- Một lần lắc có thể gây ra dao động 30–60 giây không dừng
- Công nhân phải đợi tải dừng hẳn mới dám tiếp cận

## Hai Phương Pháp Anti-Sway

### Phương Pháp 1: Open-Loop (Input Shaping)

**Nguyên lý:** Tính toán trước biên dạng gia tốc (Acceleration Profile) sao cho lực gia tốc thứ nhất và thứ hai triệt tiêu nhau.

\`\`\`
Bình thường:      [Gia tốc]───────[Giảm tốc]
                  → Tải lắc mạnh

Input Shaping:    [Gia tốc 1][Gia tốc 2]─[Giảm tốc 1][Giảm tốc 2]
                  → Hai xung gia tốc triệt tiêu dao động
\`\`\`

**Ưu điểm:** Không cần cảm biến, đơn giản, chi phí thấp
**Nhược điểm:** Chỉ hiệu quả khi chiều dài cáp không đổi

### Phương Pháp 2: Closed-Loop (Feedback Control)

**Nguyên lý:** Dùng cảm biến (Camera/Encoder/IMU) đo góc lắc thực tế → Phản hồi liên tục cho biến tần → Điều chỉnh tốc độ xe con để triệt tiêu lắc

**Cảm biến phổ biến:**
- **Camera + Computer Vision:** Nhận diện vị trí tải theo thời gian thực
- **IMU (Inertial Measurement Unit):** Đo gia tốc và góc lắc của dầm đòn gánh
- **Rope Angle Sensor:** Cảm biến góc nghiêng cáp

**Ưu điểm:** Hiệu quả với mọi chiều dài cáp, phản ứng với nhiễu bên ngoài
**Nhược điểm:** Phức tạp hơn, cần hiệu chỉnh

## Tại Sao Quan Trọng Với Ladle Crane?

1. **Năng suất:** Tải dừng nhanh hơn → chu kỳ nhanh hơn → nhà máy sản xuất nhiều tấn/ngày hơn
2. **An toàn:** Thùng thép lỏng lắc mạnh → có thể va vào kết cấu nhà xưởng
3. **Chính xác:** Khi rót thép vào CCM, cần định vị chính xác đến ±50mm`,
    quizzes: [
      {
        question: 'Phương pháp Anti-Sway nào không cần cảm biến đo góc lắc?',
        options: [
          'Closed-Loop Feedback Control',
          'Camera Vision System',
          'Open-Loop Input Shaping',
          'IMU Sensor Feedback'
        ],
        correctAnswer: 2,
        explanation: 'Open-Loop Input Shaping không cần cảm biến. Nó tính toán trước biên dạng gia tốc sao cho hai xung gia tốc triệt tiêu dao động. Nhược điểm là chỉ hiệu quả khi chiều dài cáp không đổi.'
      }
    ]
  },
  {
    part: 'G',
    order: 9,
    title: 'Chiến Lược Bán Hàng & Phân Tích Đối Thủ Cạnh Tranh',
    summary: 'Các "ông trùm" cẩu thép toàn cầu, điểm mạnh/yếu của từng đối thủ, và chiến lược định vị trong thị trường cầu trục luyện kim.',
    content: `# Chuyên Đề 17–19: Chiến Lược Bán Hàng & Phân Tích Đối Thủ

## Các "Ông Trùm" Cẩu Thép Toàn Cầu

### 1. Konecranes (Phần Lan)

**Thế mạnh:**
- Thương hiệu toàn cầu, hơn 100 năm kinh nghiệm
- Hệ thống CMS (Crane Management System) tiên tiến nhất thị trường
- Anti-sway SWAY-CONTROL® được coi là tiêu chuẩn ngành

**Điểm yếu (cơ hội cho chúng ta):**
- Giá cao hơn 30–50% so với đối thủ Châu Á
- Lead time dài (12–18 tháng)
- After-sales service tại Việt Nam mỏng

### 2. Demag (Đức – thuộc Terex)

**Thế mạnh:**
- Hộp số và cụm nâng hạ (Rope Hoist) chất lượng cực cao
- Tiêu chuẩn thiết kế nghiêm ngặt (TÜV certified)

**Điểm yếu:**
- Tập trung vào cầu trục nhẹ/trung, ít cạnh tranh ở Heavy-duty >100T
- Phụ thuộc vào phụ tùng Đức → chi phí bảo trì cao

### 3. ZPMC (Trung Quốc)

**Thế mạnh:**
- Giá rẻ hơn 40–60% so với châu Âu
- Năng lực sản xuất lớn, lead time ngắn

**Điểm yếu:**
- Khách hàng cao cấp (Samsung, POSCO) lo ngại về chất lượng dài hạn
- Hệ thống automation và CMS còn kém so với Konecranes/Demag

## Định Vị Chiến Lược

**Vị trí mục tiêu:** "Chất lượng châu Âu, giá cạnh tranh châu Á"

| Tiêu chí | Konecranes | ZPMC | **Mục tiêu** |
|---------|-----------|------|------------------------|
| Chất lượng kết cấu | ★★★★★ | ★★★ | ★★★★ |
| Hệ thống điều khiển | ★★★★★ | ★★★ | ★★★★ |
| Giá cả | ★★ (đắt) | ★★★★★ (rẻ) | ★★★★ |
| After-sales VN | ★★ | ★★★ | ★★★★★ |
| Lead time | ★★ | ★★★★ | ★★★★ |

## Chiến Lược Bán Hàng Theo Từng Giai Đoạn

**Giai đoạn 1 (Năm 1–2): Chứng minh năng lực**
- Target: EAF Loading Crane (dễ hơn Ladle Crane thuần túy)
- Dùng linh kiện châu Âu (ABB/Siemens) để tạo niềm tin
- Thuê chuyên gia tư vấn kỹ thuật từ châu Âu để co-design

**Giai đoạn 2 (Năm 3–4): Tấn công Ladle Crane**
- Có track record từ giai đoạn 1
- Chào kèm gói Bảo trì dự đoán (Predictive Maintenance) – điểm khác biệt với ZPMC
- Đàm phán framework agreement với nhà máy thép lớn (Hòa Phát, POSCO VN)

**Giai đoạn 3 (Năm 5+): Xuất khẩu khu vực**
- ASEAN (Indonesia, Thái Lan, Philippines) có nhu cầu tương tự
- Chúng ta có lợi thế: Hiểu văn hóa châu Á, gần địa lý`,
    quizzes: [
      {
        question: 'Đâu là lợi thế cạnh tranh lớn nhất so với Konecranes tại thị trường Việt Nam?',
        options: [
          'Chất lượng kỹ thuật cao hơn',
          'Thương hiệu lâu đời hơn',
          'After-sales service tại chỗ và giá cạnh tranh hơn',
          'Hệ thống CMS tiên tiến hơn'
        ],
        correctAnswer: 2,
        explanation: 'Konecranes có after-sales service mỏng tại Việt Nam và giá cao hơn 30–50%. Chúng ta có thể cạnh tranh bằng dịch vụ tại chỗ nhanh chóng và giá hợp lý hơn.'
      },
      {
        question: 'Theo chiến lược đề xuất, nên bắt đầu tấn công phân khúc nào trước?',
        options: [
          'Ladle Crane ngay từ đầu để định vị cao',
          'EAF Loading Crane để xây dựng track record trước',
          'Cầu trục kho bãi thành phẩm',
          'Xuất khẩu sang ASEAN ngay'
        ],
        correctAnswer: 1,
        explanation: 'EAF Loading Crane ít rủi ro hơn Ladle Crane thuần túy và giúp chúng ta xây dựng kinh nghiệm thực tế, track record, và niềm tin của khách hàng trước khi tấn công phân khúc cao hơn.'
      }
    ]
  }
]

async function main() {
  console.log('Seeding database...')

  const adminPassword = await bcrypt.hash('admin123', 10)
  const studentPassword = await bcrypt.hash('student123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@ladlecrane.com' },
    update: {},
    create: {
      email: 'admin@ladlecrane.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'student@ladlecrane.com' },
    update: {},
    create: {
      email: 'student@ladlecrane.com',
      name: 'Học Viên Demo',
      password: studentPassword,
      role: 'STUDENT',
    },
  })

  for (const chapter of chapters) {
    const { quizzes, ...chapterData } = chapter

    const createdChapter = await prisma.chapter.upsert({
      where: { id: `chapter-${chapterData.order}` },
      update: chapterData,
      create: { id: `chapter-${chapterData.order}`, ...chapterData },
    })

    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i]
      await prisma.quiz.upsert({
        where: { id: `quiz-${chapterData.order}-${i}` },
        update: quiz,
        create: { id: `quiz-${chapterData.order}-${i}`, chapterId: createdChapter.id, ...quiz },
      })
    }
  }

  console.log('Seeding complete!')
  console.log('Admin: admin@ladlecrane.com / admin123')
  console.log('Student: student@ladlecrane.com / student123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
