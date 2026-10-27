# Heuristic và đánh giá trải nghiệm

Dùng ở R1 Review & Refine và cho agent `ux-lead` (`engine/agents/ux-lead.md`). File này phủ các trục Requirement fit, Flow và IA, Heuristic, Visual hierarchy, Responsive và nội dung của `scorecard.md`. Trục Accessibility theo `accessibility.md`; trục Consistency với design system theo luật của domain ở `domain/design-system.md`.

## Năm nguyên tắc chấm

| # | Nguyên tắc | Cách làm |
|---|---|---|
| 1 | Đọc số thật, không đoán từ ảnh | Tương phản tính từ giá trị thật của biến ở mode đang chấm; khoảng cách, kích thước đọc từ node và biến đang gán; text style đọc từ layer; state đếm từ frame. Ảnh chụp chỉ dùng cho nhận xét bằng mắt |
| 2 | Đối chiếu ba nguồn | Yêu cầu (đúng việc chưa), design system của domain (đúng hệ chưa), chuẩn ngành Nielsen và WCAG (đúng nghề chưa). Thiếu nguồn nào thì ghi "không có để đối chiếu", không suy đoán |
| 3 | Dịch chuẩn ngành sang thước của domain trước khi chấm | Theo bảng ở mục Dịch chuẩn ngành. Không chấm bằng thước của một design system khác |
| 4 | Finding có đích | Vị trí, hiện trạng có số đo, đích là tên biến hoặc text style của domain kèm giá trị, mức, cách sửa cụ thể |
| 5 | Mức nhất quán | Critical, Major, Minor theo bảng ở mục Viết finding; cùng loại lỗi cùng mức trên mọi màn |

## Thứ tự review: tổng quát tới chi tiết

1. Requirement fit: đúng việc chưa.
2. Flow và IA: đi được trọn luồng chưa.
3. Mười heuristic: lỗi trải nghiệm ẩn.
4. Phân cấp thị giác.
5. Consistency với design system (luật của domain).
6. Accessibility (`accessibility.md`).
7. Responsive và nội dung.

Lỗi ở bước trên làm phần sau mất ý nghĩa: màn thiếu chức năng thì chưa cần chấm khoảng cách.

## Requirement fit

- Mỗi dòng của scope có mặt trên màn, đúng vị trí đã mô tả trong `ux-brief.md` hoặc `design-strategy.md`?
- Có chức năng, nội dung nằm ngoài scope mà chưa có quyết định của Designer?
- Business rule thể hiện đúng: mỗi vai thấy đúng phần được thấy, state Disabled và Permission đúng điều kiện (`screen-states.md`)?
- Yêu cầu đòi điều design system chưa có (mode, component, state): ghi `GAP`, không tính là lỗi của Designer.
- Không có scope: trục này N/A, ghi rõ, không suy đoán yêu cầu.

## Flow và IA

- Bước kế tiếp hiển nhiên ở mọi màn; có Quay lại, Huỷ, Thử lại ở nơi cần; không có ngõ cụt.
- Màn đặt đúng dạng trong cấu trúc app (trang, modal, drawer, popup) như đã khai ở D2 và khớp app-map (Product KB mục 4).
- Nhóm nội dung theo việc của người dùng, không theo cấu trúc dữ liệu của hệ thống. Thông tin tóm tắt trước, chi tiết khi người dùng cần.

Cognitive walkthrough: đặt mình vào vị trí người dùng mới, hỏi bốn câu tại mỗi bước tương tác chính của flow.

| # | Câu hỏi | Trả lời "không" nghĩa là |
|---|---|---|
| 1 | Người dùng có biết mình cần làm gì ở bước này không? | Mục tiêu của bước không rõ trên màn |
| 2 | Điều khiển cho việc đó có dễ thấy không? | Nút, trường nhập bị chìm, bị ẩn hoặc nằm sai vùng |
| 3 | Nhãn có được hiểu đúng không? | Nhãn dùng từ của hệ thống, không dùng từ của người dùng |
| 4 | Sau thao tác, phản hồi có rõ không? | Người dùng không biết thao tác thành công hoặc thất bại |

Mỗi câu trả lời "không" là một finding, ghi kèm mã flow và bước cụ thể.

## Mười heuristic của Nielsen

Chấm từng heuristic. Heuristic không áp dụng thì ghi N/A kèm lý do.

| # | Heuristic | Câu hỏi kiểm trên màn |
|---|---|---|
| 1 | Visibility of system status | Thao tác phải chờ có Loading hoặc thanh tiến độ? Sau thao tác ghi có Success hoặc Error? Trạng thái của đối tượng (đang xử lý, đã duyệt) hiện trên màn? |
| 2 | Match between system and the real world | Nhãn và thông báo dùng từ của người dùng và nghiệp vụ (Product KB mục 3, mục 8), không dùng tên trường dữ liệu hoặc mã kỹ thuật? Thứ tự trường theo trình tự công việc thực tế? |
| 3 | User control and freedom | Mỗi bước có lối thoát (Huỷ, Quay lại, Đóng)? Thao tác lớn có hoàn tác hoặc bước xác nhận? |
| 4 | Consistency and standards | Cùng hành động có cùng nhãn, cùng vị trí với màn liền kề trong app-map? Chi tiết chấm ở trục Consistency |
| 5 | Error prevention | Thao tác xoá hoặc không hoàn tác có hộp xác nhận nêu hậu quả? Ô nhập dùng điều khiển hợp với loại dữ liệu (chọn ngày, danh sách chọn) thay vì ô gõ tự do? Hành động chưa hợp lệ bị khoá kèm lý do? |
| 6 | Recognition rather than recall | Thông tin cần để quyết định hiện trên chính màn đó, không bắt nhớ từ màn trước? Có giá trị mặc định, mục gần đây khi phù hợp? |
| 7 | Flexibility and efficiency of use | Người dùng thường xuyên có lối tắt (thao tác hàng loạt, lưu bộ lọc, phím tắt) khi hợp ngữ cảnh, và lối tắt không làm rối màn với người mới? |
| 8 | Aesthetic and minimalist design | Mỗi phần tử phục vụ một việc trên màn? Không có thông tin lặp lại hoặc trang trí không mang nghĩa? |
| 9 | Help users recognize, diagnose, and recover from errors | Thông báo lỗi nói điều gì sai, vì sao và cách sửa, không đưa mã lỗi trần? Đặt cạnh nơi gây lỗi, có icon và chữ, không chỉ dựa vào màu? |
| 10 | Help and documentation | Form hoặc thao tác phức tạp có hướng dẫn ngay tại vị trí cần (chữ trợ giúp, tooltip)? Placeholder không bị dùng thay nhãn? |

## Phân cấp thị giác

Phần lớn là nhận xét bằng mắt, ghi nhãn Visual judgment. Riêng số nút chính mỗi vùng đếm được, ghi Measured.

- Một hành động chính mỗi vùng: đếm nút dùng mức nhấn chính của design system trong mỗi vùng. Hai nút chính trở lên cạnh nhau là finding.
- Đường quét mắt: tiêu đề và thông tin quan trọng nằm ở đầu luồng quét (góc trên bên trái với ngôn ngữ viết từ trái sang phải); hành động chính đặt ở điểm dừng mắt tự nhiên của vùng, theo mẫu F hoặc Z.
- Dễ quét: nhấn mạnh bằng độ đậm theo vai trò của text style, không bằng tăng cỡ chữ tuỳ ý; tiêu đề các cấp dùng đúng text style theo vai trò; khối chữ dày được chia nhỏ.
- Gần nhau (Gestalt): nhãn gần trường của nó hơn trường khác; nhóm liên quan có khoảng trắng chung; hai cấp quan hệ khác nhau không dùng hai bậc liền kề trong thang khoảng cách, vì mắt không phân biệt được.
- Phân tách nhẹ trước: ưu tiên khoảng trắng và nền nhạt trước khi thêm viền; đổ bóng theo bậc độ nổi của domain (thẻ thấp hơn menu nổi, menu nổi thấp hơn modal).
- Tỉ trọng màu: xem dòng 60-30-10 ở bảng dưới.

## Dịch chuẩn ngành sang thước của domain

Chuẩn ngành là tài liệu nền. Thước đo là design system của domain. Thứ domain chưa quy định thì ghi rõ "chưa có trong design system của domain" và ghi nguồn chuẩn ngành đã dùng.

| Chuẩn ngành | Thước của domain | Cách chấm |
|---|---|---|
| Lưới 8 điểm | Thang khoảng cách ở `domain/tokens.md`, bảng padding ở `domain/design-system.md` | Giá trị ngoài thang là finding, đích là bậc gần nhất trong thang |
| Tỉ lệ thang chữ | Text style đã phát hành ở `domain/tokens.md` | Chữ không gán text style, hoặc chọn style theo cỡ chữ thay vì vai trò, là finding |
| 60-30-10 | Vai trò màu: màu nền và màu bề mặt chiếm phần lớn, màu chữ chính và chữ phụ cho cấu trúc, màu nhấn chỉ ở hành động chính, mục đang chọn, liên kết | Màu nhấn lan ra ngoài vai trò nhấn là finding, ghi Visual judgment |
| Vùng chạm, tương phản | `accessibility.md` và ngưỡng ở Product KB mục 9 | Theo `accessibility.md` |
| Breakpoint chung của ngành | Breakpoint và lưới ở `domain/tokens.md` | Chấm theo breakpoint đã khai trong scope |

Không dùng đơn vị hoặc thang của hệ khác (dp, pt, thang chữ tự nhân theo tỉ lệ) làm thước chấm.

## Responsive và nội dung

- Mỗi breakpoint khai trong scope có frame tương ứng, mode của frame khớp breakpoint; bố cục co giãn không vỡ, không tràn. Đọc constraint và auto layout thật, không đoán từ ảnh.
- Chuỗi tiếng Việt dài nhất thực tế: cắt hoặc xuống dòng đúng nơi đã khai; chữ dài không làm vỡ nút, ô bảng (so chiều rộng thật với chiều rộng tối thiểu).
- Số, tiền, ngày đúng định dạng của Product KB mục 8; dấu tiếng Việt không bị cắt (`accessibility.md` mục Chữ tiếng Việt có dấu).

## Số đo và nhận xét bằng mắt

| Measured: đo được qua Figma | Visual judgment: nhận xét bằng mắt |
|---|---|
| Tương phản tính từ giá trị thật của biến | Đường quét mắt, điểm nhấn |
| Khoảng cách, padding, kích thước, vùng chạm | Mật độ thưa hoặc chật |
| Biến, text style, component đang gán | Tỉ trọng màu |
| Số nút chính mỗi vùng, số state đã dựng | Cảm giác cân đối, nhịp |
| Chiều rộng frame, breakpoint, tràn khung | Mức độ dễ hiểu của nhãn khi chưa kiểm với người dùng |

Mỗi finding ghi một trong hai nhãn. Nhận xét bằng mắt không viết như số đo. Không có công cụ Figma: mọi nhận xét là Visual judgment, trục cần số đo ghi N/A.

## Viết finding có đích

Một finding đủ năm phần: vị trí (node), hiện trạng (số đo, biến đang dùng), đích (tên biến hoặc text style của domain kèm giá trị), mức và trạng thái, cách sửa cụ thể. Designer sửa được ngay mà không phải hỏi lại.

| Chưa đạt | Đạt |
|---|---|
| "Tương phản hơi thấp" | "Chữ trợ giúp dưới trường Email (node `<id>`) dùng màu chữ của placeholder, đo được `<x>`:1 trên màu nền, dưới 4.5:1 (WCAG 1.4.3). Đích: màu chữ phụ theo `domain/tokens.md`, đạt từ 4.5:1, đúng vai trò chữ trợ giúp. Major, Must fix" |
| "Khoảng cách chưa đều" | "Khoảng giữa nhãn và trường (node `<id>`) là `<x>` px, ngoài thang khoảng cách. Đích: bậc `<y>` px gần nhất trong `domain/tokens.md`. Minor, Should fix" |

| Mức | Nghĩa |
|---|---|
| Critical | Chặn nghiệp vụ, gây mất dữ liệu, hoặc chữ chính của nhiệm vụ không đạt tương phản |
| Major | Trải nghiệm hỏng rõ, hoặc sai design system có hệ thống |
| Minor | Hoàn thiện, không cản trở việc |

Trạng thái: Must fix, Should fix, Optional, Need confirm, Passed. Thứ design system chưa có ghi là `GAP`, không trừ điểm Designer. Không viết "chưa tối ưu", "nên cải thiện" khi không có đích.

## Nguồn

- Bộ gốc `claude-skills-uiux-vic`: `vic-design-final-review/references/review.md` trục 1 đến 4 và 7; `vic-design-final-review/SKILL.md` nguyên tắc 1 đến 5.
- AWS AI-DLC (MIT-0): `aidlc-workflows/core/knowledge/aidlc-design-agent/ux-guide.md`, mục Nielsen's 10 Usability Heuristics và Information Architecture.
- Mười heuristic của Jakob Nielsen (Nielsen Norman Group, kiến thức công khai); cognitive walkthrough theo Wharton, Rieman, Lewis, Polson.
- Đã bỏ: tên biến, text style, tên component, node id, file key, tên sản phẩm của bộ gốc; thay bằng vai trò chung và trỏ về `domain/tokens.md`, `domain/design-system.md`.
- Đã bỏ: thang khoảng cách, bảng padding, bo góc, lưới cột của bộ gốc; chuyển thành trỏ tới thước của domain.
- Đã bỏ: trục 5 Consistency của bộ gốc (luật riêng của một design system); trục này chấm theo `domain/design-system.md`.
- Đã sửa: bộ gốc ghi vùng chạm 44 px như ngưỡng bắt buộc; nay trỏ về `accessibility.md`, nơi phân rõ mức AA và AAA.
- Đã bỏ: các số không có nguồn trong `ux-guide.md` của AWS (tối đa 7 mục điều hướng, tối đa 3 cấp, mọi trang trong 3 lần nhấp, thử nhãn với 5 người); phần interaction pattern và hiệu năng của AWS không thuộc phạm vi file này.
