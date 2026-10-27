# Accessibility

Dùng ở E2 (tự kiểm S7 trong `engine/verification/ui-design.md`) và R1 (trục Accessibility của `scorecard.md`). Nền: WCAG 2.2 mức AA. Mức và ngưỡng domain chọn (ví dụ vùng chạm cao hơn AA) ghi ở Product KB mục 9, luật chi tiết ở `domain/design-system.md`; domain chọn cao hơn AA thì chấm theo domain. Mỗi tiêu chí dưới đây ghi số và mức theo WCAG 2.2.

## Tương phản

| Đối tượng | Ngưỡng | Tiêu chí |
|---|---|---|
| Chữ thường | Từ 4.5:1 | 1.4.3 Contrast (Minimum), AA |
| Chữ lớn: từ 24 px chữ thường, từ 18.66 px chữ đậm (18 pt, 14 pt đậm) | Từ 3:1 | 1.4.3, AA |
| Thành phần không phải chữ: viền ô nhập, icon mang nghĩa, chỉ báo trạng thái kể cả chỉ báo focus | Từ 3:1 so với màu liền kề | 1.4.11 Non-text Contrast, AA |
| Chữ của phần tử đang disabled, logo, chữ trang trí | Không bắt buộc | Ngoại lệ của 1.4.3 |

Cách đo:
- Tính từ giá trị thật của biến (sau khi phân giải alias) ở từng mode sản phẩm có. Không ước lượng từ ảnh chụp.
- Màu có độ trong suốt: tính trên màu sau khi trộn với nền thật bên dưới.
- Chữ trên ảnh hoặc dải màu: đo ở vùng có tương phản thấp nhất.
- Phần tử disabled không bắt buộc đạt ngưỡng, nhưng vẫn phải phân biệt được với trạng thái thường và đọc được.

## Vùng chạm

| Mức | Ngưỡng | Nguồn |
|---|---|---|
| AA, nền của engine | 24 x 24 px | 2.5.8 Target Size (Minimum) |
| AAA | 44 x 44 px | 2.5.5 Target Size (Enhanced); cũng là khuyến nghị của nền tảng di động |

Ngoại lệ của 2.5.8, phần tử nhỏ hơn 24 x 24 px vẫn đạt khi thuộc một trong các trường hợp:
- Khoảng cách: đặt một vòng tròn đường kính 24 px ở tâm mỗi vùng chạm nhỏ, các vòng không giao vùng chạm khác và không giao nhau.
- Tương đương: cùng chức năng có một điều khiển khác trên trang đạt ngưỡng.
- Trong dòng chữ: liên kết nằm trong câu văn.
- Do trình duyệt quyết định, tác giả không chỉnh kích thước.
- Bắt buộc: kích thước đó là thiết yếu hoặc do quy định pháp lý.

Đo vùng nhận thao tác (khung của instance, kể cả padding), không đo riêng icon. Lỗi thường gặp: icon 16 px đứng một mình không có vùng đệm. Ngưỡng domain chọn ghi ở Product KB mục 9; KB chưa ghi thì chấm theo AA và ghi rõ nguồn trong finding.

## Focus và bàn phím

| Yêu cầu | Tiêu chí |
|---|---|
| Mọi chức năng dùng được bằng bàn phím | 2.1.1 Keyboard, A |
| Không kẹt bàn phím: rời được khỏi mọi thành phần bằng bàn phím | 2.1.2 No Keyboard Trap, A |
| Thứ tự focus theo thứ tự đọc hợp lý | 2.4.3 Focus Order, A |
| Focus nhìn thấy được ở mọi phần tử tương tác | 2.4.7 Focus Visible, AA |
| Phần tử đang nhận focus không bị che hoàn toàn bởi header dính, banner, lớp phủ | 2.4.11 Focus Not Obscured (Minimum), AA |
| Chỉ báo focus đạt 3:1 với màu liền kề | 1.4.11, AA |

- Thư viện Figma chưa có variant focus không miễn yêu cầu: ghi yêu cầu focus cho code trong ghi chú bàn giao.
- Độ dày, khoảng lệch của viền focus lấy từ design system của domain. Domain chưa quy định thì hỏi Designer, không tự đặt. Yêu cầu cụ thể về diện tích và độ dày thuộc 2.4.13 Focus Appearance, mức AAA, chỉ áp dụng khi domain chọn.
- Modal: focus chuyển vào modal khi mở, phím Escape đóng modal, focus trở về phần tử đã mở modal.

## Tên cho trình đọc màn hình

| Yêu cầu | Tiêu chí |
|---|---|
| Nút chỉ có icon có nhãn trợ năng mô tả hành động ("Xoá tệp", không "Thùng rác") | 4.1.2 Name, Role, Value, A |
| Ảnh, icon mang nghĩa có văn bản thay thế; icon, ảnh trang trí được ẩn khỏi trình đọc màn hình | 1.1.1 Non-text Content, A |
| Ô nhập có nhãn nhìn thấy được; placeholder không thay nhãn | 3.3.2 Labels or Instructions, A |
| Tên trợ năng chứa chữ đang hiển thị trên nút | 2.5.3 Label in Name, A |
| Tiêu đề và nhãn mô tả đúng nội dung, mục đích | 2.4.6 Headings and Labels, AA |

Trên Figma: nhãn trợ năng của nút chỉ có icon ghi ở mô tả component hoặc ghi chú bàn giao; icon trang trí đánh dấu "trang trí". Tên thuộc tính trong code là việc của Dev.

## Không chỉ dựa vào màu

| Yêu cầu | Tiêu chí |
|---|---|
| Trạng thái (thành công, lỗi, cảnh báo) có icon và chữ đi kèm màu | 1.4.1 Use of Color, A |
| Lỗi nhập liệu được nêu bằng chữ, chỉ rõ trường lỗi | 3.3.1 Error Identification, A |
| Lỗi có gợi ý cách sửa khi biết cách sửa | 3.3.3 Error Suggestion, AA |
| Thông báo trạng thái (toast, kết quả tìm kiếm) được trình đọc màn hình đọc lên mà không chuyển focus | 4.1.3 Status Messages, AA |

- Viền đỏ của ô nhập không đủ: cần dòng chữ lỗi dưới trường.
- Liên kết trong đoạn văn phân biệt với chữ thường bằng gạch chân hoặc dấu hiệu khác ngoài màu.
- Biểu đồ: các chuỗi dữ liệu phân biệt bằng nhãn hoặc ký hiệu, không chỉ bằng màu.
- Trường bắt buộc: ký hiệu kèm chú thích nghĩa của ký hiệu.

## Chữ tiếng Việt có dấu

WCAG không có tiêu chí riêng cho dấu tiếng Việt; phần này là yêu cầu của engine vì chữ bị cắt dấu làm sai nghĩa.

- Line height lấy theo text style của domain, không tự đặt nhỏ hơn.
- Text layer không đặt chiều cao cố định thấp hơn line height; frame cha bật cắt nội dung (clip content) không được cắt phần dấu.
- Kiểm bằng chuỗi có dấu chồng ở trên và dấu ở dưới: chữ hoa như "Ấ", "Ẫ", "Ổ", "Ữ", "Ỹ" và "Ặ", "Ợ", "Ụ", đặt cùng một dòng.
- Chữ cắt một dòng có dấu ba chấm: dấu không bị cắt theo chiều dọc.
- Font có đủ ký tự tiếng Việt, không rơi về font dự phòng ở một số ký tự.
- Ở code: người dùng tăng khoảng cách dòng và khoảng cách chữ thì nội dung không mất (1.4.12 Text Spacing, AA); phóng to chữ tới 200% không mất nội dung (1.4.4 Resize Text, AA).

## Kiểm ở đâu

| Kiểm được trên Figma (E2, R1) | Chỉ kiểm được ở prototype HTML hoặc code |
|---|---|
| Tương phản chữ và thành phần không phải chữ | Điều hướng bằng bàn phím, không kẹt bàn phím |
| Kích thước vùng chạm và khoảng cách giữa các vùng chạm | Thứ tự focus thực tế |
| Có variant focus hoặc ghi chú yêu cầu focus; tương phản của chỉ báo focus | Focus không bị che khi cuộn (2.4.11) |
| Nút chỉ có icon có ghi nhãn trợ năng | Tên trợ năng thật mà trình đọc màn hình đọc lên |
| Trạng thái và lỗi có icon và chữ | Thông báo trạng thái được đọc lên (4.1.3) |
| Ô nhập có nhãn nhìn thấy được | Phóng to 200% (1.4.4); hiển thị lại ở chiều rộng 320 CSS px không cuộn ngang (1.4.10 Reflow, AA) |
| Dấu tiếng Việt không bị cắt trong text layer | Tăng khoảng cách chữ (1.4.12) |
| Thứ tự đọc dự kiến (ghi chú trên frame) | Nội dung hiện khi hover hoặc focus đóng được, giữ được (1.4.13 Content on Hover or Focus, AA) |

Prototype HTML ở E3 dùng thư viện component frontend theo Product KB mục 7, nên kiểm thử được bàn phím và focus ở mức sơ bộ. Kiểm cuối cùng thuộc Dev và QA trên code. Phần chưa kiểm được ghi vào mục Limitation của báo cáo.

## Tự kiểm ở E2 (S7)

- [ ] Chữ thường từ 4.5:1, chữ lớn từ 3:1, thành phần không phải chữ từ 3:1, tính từ giá trị thật của biến
- [ ] Vùng chạm đạt ngưỡng ở Product KB mục 9, tối thiểu 24 x 24 px hoặc thuộc ngoại lệ của 2.5.8
- [ ] Mọi phần tử tương tác có focus nhìn thấy được, hoặc có ghi chú yêu cầu focus cho code
- [ ] Nút chỉ có icon có nhãn trợ năng; icon trang trí được đánh dấu
- [ ] Trạng thái và lỗi có chữ đi kèm màu
- [ ] Chuỗi tiếng Việt có dấu chồng không bị cắt

## Mức của finding accessibility

| Mức | Khi nào |
|---|---|
| Critical | Chữ chính của nhiệm vụ không đạt 1.4.3, hoặc vi phạm làm người dùng không hoàn thành được nhiệm vụ chính |
| Major | Vi phạm tiêu chí mức A hoặc AA khác |
| Minor | Không đạt ngưỡng domain chọn cao hơn AA, khi Product KB mục 9 không quy định mức khác |

Finding ghi số tiêu chí, mức và nguồn ngưỡng (WCAG hoặc Product KB mục 9).

## Nguồn

- Bộ gốc `claude-skills-uiux-vic`: `vic-design-final-review/references/review.md` trục 6; `vic-design-generate/references/qa-screen.md` S7.
- AWS AI-DLC (MIT-0): `aidlc-workflows/core/knowledge/aidlc-design-agent/accessibility-wcag.md`, `ux-guide.md` mục WCAG và Touch Target Sizing.
- WCAG 2.2 của W3C (Web Content Accessibility Guidelines 2.2, W3C Recommendation).
- Đã sửa: bộ gốc và AWS ghi vùng chạm 44 x 44 px như mức bắt buộc; nay 24 x 24 px là mức AA (2.5.8), 44 x 44 px là mức AAA (2.5.5) và khuyến nghị của nền tảng.
- Đã sửa: AWS dựa trên WCAG 2.1; nay dùng WCAG 2.2, thêm 2.4.11, 2.5.8.
- Đã sửa: AWS định nghĩa chữ lớn là "từ 18 px đậm hoặc 24 px"; nay theo WCAG là 18 pt (24 px) hoặc 14 pt đậm (18.66 px).
- Đã sửa: AWS ghi viền focus tối thiểu 2 px, 3:1 như yêu cầu chung; đó là 2.4.13 mức AAA, ở AA chỉ yêu cầu nhìn thấy được và 3:1 theo 1.4.11.
- Đã bỏ: các số không có nguồn của AWS (khoảng cách 8 px giữa vùng chạm, 48 x 48 px cho nút chính trên di động, công cụ tự động bắt khoảng 30% lỗi).
- Đã bỏ: mục HTML hợp lệ của AWS (tiêu chí 4.1.1 Parsing không còn trong WCAG 2.2); chi tiết ARIA, landmark, phím theo component thuộc việc của Dev.
- Đã bỏ: tên biến màu, tên component, mode của bộ gốc; thay bằng vai trò chung và trỏ về Product KB.
- Đã thêm: phần chữ tiếng Việt có dấu và bảng kiểm trên Figma hoặc ở prototype, code.
