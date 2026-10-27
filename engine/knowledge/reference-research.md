# Nghiên cứu reference

Dùng ở E1 cho màn L3, để chọn hướng thị giác trước khi vẽ. Màn L1, L2 không cần nghiên cứu reference: pattern của chính app và của màn liền kề là reference tốt nhất. Kết quả ghi vào `ux-brief.md`: bảng Design ref, bảng Các hướng đã đưa, dòng Reference lock.

Phân vai: design ref trả lời câu hỏi "theo hướng nào"; design system của sản phẩm trả lời câu hỏi "bằng giá trị nào".

## Khi nào cần

| Tình huống | Cách làm |
|---|---|
| Màn L1, L2 | Không nghiên cứu. Dùng pattern cũ gần nhất theo `engine/protocol/design-levels.md` |
| Màn L3, Designer đã gửi ref | Phân tích ref đã gửi. Không nghiên cứu thêm, trừ khi Designer yêu cầu hoặc ref thiếu một tầng cần cho màn (xem Ba tầng câu hỏi) |
| Màn L3, chưa có ref | Đề xuất nghiên cứu theo mục Nguồn theo thứ tự ưu tiên; Designer đồng ý mới chạy |
| Màn L3, không có ref và không nghiên cứu được | Blocked, lý do "chờ design ref". Không tự chế hướng thị giác |

Ref của intent lưu ở `inputs/refs/`. Ref dùng lại được cho intent khác thì đề xuất đưa vào thư viện ref của sản phẩm (KB mục 10). Các màn L3 cùng một flow dùng chung một lần nghiên cứu, chỉ bổ sung phần riêng của từng màn.

## Nguồn theo thứ tự ưu tiên

| Mức | Nguồn | Điều kiện | Vai của AI |
|---|---|---|---|
| 1 | Ref Designer gửi: ảnh, link, frame Figma, màn của sản phẩm khác; ref có sẵn trong KB mục 10 | Xét đầu tiên | Phân tích. Không thay ref của Designer bằng ref tự tìm |
| 2 | Công cụ nghiên cứu nối vào máy: Refero, Mobbin hoặc công cụ khác có kho màn sản phẩm thật | Designer chưa có ref và đồng ý nghiên cứu | Tìm, xem, tóm tắt; Designer chọn |
| 3 | Không có công cụ nào | Designer chưa có ref | Soạn danh sách truy vấn theo ba tầng; Designer tự duyệt trang thư viện ref hoặc sản phẩm tương tự, gửi ảnh hoặc link; AI phân tích như mức 1 |

Không có kết quả ở cả ba mức: phản hồi Blocked.

## Ba tầng câu hỏi

| Tầng | Câu hỏi | Cần khi | Rút ra | Ví dụ truy vấn |
|---|---|---|---|---|
| Hướng thị giác | Màn nên mang cảm giác gì | Mọi màn L3 | Mật độ, nhịp khoảng trắng, phân cấp, vai trò của hình ảnh, một chi tiết đáng nhớ | `analytics dashboard, dense, light theme` |
| Pattern một màn | Sản phẩm thật giải bài toán của màn này bằng cách nào | Mọi màn L3 | Bố cục, thứ bậc thông tin, vị trí hành động chính và phụ, state, nội dung chữ | `first-run empty state with illustration` |
| Flow nhiều bước | Các bước nối với nhau theo trình tự nào | Màn thuộc chuỗi nhiều bước | Điểm vào, điểm ra, số bước, điểm quyết định, bước xác nhận, xử lý lỗi, phản hồi của hệ thống ở từng bước | `onboarding with progress indicator` |

Độ sâu: mỗi tầng xem ba đến năm ref; chỉ kết luận điểm chung khi đã so ít nhất ba ref. Flow ít kết quả thì mở rộng truy vấn; vẫn ít thì dựng lại hành trình từ các màn đơn lẻ.

## Truy vấn gửi dịch vụ bên thứ ba

- Chỉ dùng loại màn, loại pattern, loại người dùng ở dạng chung.
- Không đưa tên tính năng nội bộ, tên sản phẩm, tên khách hàng, dữ liệu thật, nội dung tài liệu yêu cầu hoặc ảnh màn chưa phát hành vào truy vấn hoặc tải lên dịch vụ bên thứ ba.

| Nên | Không nên |
|---|---|
| `multi-step approval flow` | Luồng duyệt `<tên tính năng nội bộ>` của `<tên sản phẩm>` |
| `admin table with bulk actions` | Ảnh chụp màn quản trị đang phát triển của sản phẩm |

## Phân tích một ref

Mỗi ref một dòng trong bảng Design ref (Ref, Nguồn, Học gì, Không lấy gì), theo hai trục:
- Cấu trúc: thứ tự khối, lưới, vị trí hành động chính và phụ, số hành động chính trên một vùng.
- Cảm quan: mật độ, nhịp khoảng trắng, phân cấp, vai trò của hình ảnh (ảnh chụp, minh hoạ, ảnh sản phẩm).

Điều học được viết thành mô tả kiểm được, ví dụ "bộ lọc cố định dưới tiêu đề, thu gọn được". Không viết mô tả chung chung như "trông hiện đại".

## Không lấy giá trị từ ref

- Không lấy màu, số đo (khoảng cách, kích thước, bo góc, cỡ chữ, bóng đổ), font từ ref, kể cả khi công cụ trả về bộ token của ref. Mọi giá trị theo design system của sản phẩm (KB mục 5).
- Học vai trò, không học giá trị. Ref chỉ dùng màu nhấn cho nút chính thì ghi quy tắc "màu nhấn chỉ dành cho hành động chính", sau đó áp bằng biến có cùng vai trò trong design system.
- Hướng đã chọn cần thứ design system chưa có (phong cách minh hoạ, component mới): ghi `GAP`, đề xuất qua `/kit-proposal`; không tự tạo giá trị.
- Ref dựa vào hình ảnh: giữ vai trò của hình ảnh trong bố cục. Chưa có ảnh thật thì đặt khung ảnh tạm đúng tỷ lệ, kèm mô tả hướng hình ảnh. Không thay bằng khối trang trí, không rút thành bố cục chỉ có chữ.

## Tổng hợp, chống trung bình hoá

1. Ghi điểm chung của các ref (pattern xuất hiện ở đa số ref) và một đến hai chi tiết riêng đáng học.
2. Chọn một ref hoặc một hướng làm chính. Ref phụ chỉ đóng góp chi tiết có phạm vi rõ, ví dụ chỉ cách nhóm hành động hàng loạt; không pha đều nhiều ref thành một hướng nhạt.
3. Không sao chép một ref. Hướng mới là bản điều chỉnh theo người dùng, nội dung và design system của sản phẩm.
4. Mỗi quyết định chính truy được về một ref, một yêu cầu trong `design-strategy.md`, hoặc design system. Quyết định không truy được thì bỏ, hoặc nghiên cứu thêm.

Dấu hiệu trung bình hoá, gặp thì quay lại bước 2:
- Đặc điểm sắc nét của hướng chính bị làm mềm cho an toàn: mật độ dày thành thưa, bố cục bất đối xứng thành đối xứng.
- Bố cục riêng của ref biến thành chuỗi khối chung xếp dọc.
- Mọi nhóm nội dung đều bọc trong thẻ (card) dù không có tương tác cần thẻ.
- Ref dựa vào hình ảnh bị thay bằng bố cục chỉ có chữ.

## Hai đến ba hướng

Mỗi hướng một dòng trong bảng Các hướng đã đưa: tên, mô tả một câu, ref chính, rủi ro. Các hướng khác nhau ở hướng chính, không chỉ khác ở chi tiết. Trình bằng chữ, hoặc wireframe mức thấp trong khu vực nháp theo `figma-protocol.md`; không dựng UI chi tiết trước khi Designer chọn. Designer chọn một hướng tại UX Brief Gate; lời chọn ghi nguyên văn.

## Reference lock

Một dòng trong `ux-brief.md`, theo template: hướng chính · giữ · loại bỏ.

| Phần | Quy tắc |
|---|---|
| Hướng chính | Một câu, nêu ref chính |
| Giữ | Ba đến năm đặc điểm, mỗi đặc điểm trả lời được có hoặc không khi nhìn thiết kế. Chi tiết mượn từ ref phụ ghi vào đây, tối đa hai, kèm tên ref |
| Loại bỏ | Điều thấy trong ref nhưng không lấy, kèm lý do. Bắt buộc khi đã xem từ hai ref trở lên |

Quá năm đặc điểm hoặc quá hai chi tiết mượn: lock đang dàn trải, cắt bớt. Không ghi được điều loại bỏ nghĩa là phân tích chưa xong.

Ví dụ: Reference lock: hướng chính "dashboard tổng quan mật độ vừa, chỉ số chính đứng đầu, theo ref A" · giữ "một hàng bốn chỉ số chính trên cùng; biểu đồ xu hướng chiếm nửa trái; danh sách việc cần xử lý ở cột phải; mỗi vùng một hành động chính; gom hành động hàng loạt vào một nút trình đơn (ref B)" · loại bỏ "nền tối của ref A, vì sản phẩm dùng nền sáng; thẻ bọc từng chỉ số của ref C, vì chỉ số không có tương tác".

## Dùng ở E2 và R1

- E2: Designer dựng theo lock; AI làm phương án khám phá theo lock khi Designer yêu cầu. Tự kiểm S9 có mục bám reference lock.
- R1: agent `ux-lead` đối chiếu lock. Đặc điểm giữ mà vắng, hoặc điều đã loại bỏ mà vẫn xuất hiện, là finding của trục Visual hierarchy; đây là Visual judgment nên mức cao nhất là Major theo `scorecard.md`.
- Giá trị lấy từ ref thay cho design system (màu, số đo, font) là finding của trục Consistency với design system, có số đo.
- Designer đổi hướng sau UX Brief Gate: cập nhật lock, ghi DEC; R1 chấm theo lock mới nhất.

## Nguồn

- `claude-skills-uiux-vic/vic-design-generate/references/discovery.md` mục B2a: ba tầng truy vấn, truy vấn chỉ dùng loại màn chung, ba bậc nguồn, hai trục phân tích, không trích màu số font, chống trung bình hoá, trần ba đến năm đặc điểm và hai chi tiết mượn, loại bỏ bắt buộc, dùng chung theo flow, lock làm tiêu chí nghiệm thu
- `claude-skills-uiux-vic/refero-design/SKILL.md` mục Non-Negotiables: không sao chép một ref, không trung bình hoá, giữ vai trò token, giữ vai trò hình ảnh, quyết định phải truy được nguồn
- `claude-skills-uiux-vic/refero-design/SKILL.md` mục Research Workflow và Research Depth: ba đến năm truy vấn mỗi tầng, mở rộng khi flow ít kết quả, nội dung rút ra từ từng tầng
- `claude-skills-uiux-vic/refero-design/SKILL.md` mục Synthesis: ba nhóm kết quả, khung reference lock
- `claude-skills-uiux-vic/refero-design/references/anti-ai-slop.md` mục 2, 7, 8, 9: thẻ dùng mặc định, trung bình hoá, lệch vai trò token, rút hình ảnh thành chữ
- `claude-skills-uiux-vic/refero-design/references/visual-workflow.md` mục Three Visual Directions: đưa nhiều hướng có lock, dừng để người dùng chọn
- Sửa: bộ gốc bắt buộc nghiên cứu trước mọi thiết kế; ở đây chỉ bắt buộc design ref cho màn L3, ref của Designer là nguồn chính, công cụ chỉ dùng khi Designer chưa có ref
- Sửa: bộ gốc lấy palette, font, bo góc từ ref; ở đây mọi giá trị theo design system, chỉ học vai trò
- Sửa: ba bậc nguồn của bộ gốc đổi thành ba mức theo thứ tự ref của Designer, công cụ, Designer tự duyệt
- Bỏ: tên công cụ MCP và lệnh cài đặt, danh sách truy vấn mẫu có tên thương hiệu, phần tạo ảnh bằng AI, hàng rào chất lượng về màu và font chữ
- Bỏ: các trường layout, khoảng cách, ánh xạ token của blueprint gốc; phần đó thuộc UX Brief và design system
