# UX writing tiếng Việt

Dùng ở D2 (UX Brief nén cho màn L1), E1 (nội dung chữ trong UX Brief), E2 (chữ thật trên Figma). File này chỉ có nguyên tắc chung. Giọng văn, thuật ngữ và câu mẫu riêng của sản phẩm nằm ở `domain/content-guide.md` (KB mục 8); hai nguồn lệch nhau thì theo content guide.

## 1. Thứ tự ưu tiên

Rõ ràng trước, tôn trọng người đọc sau, cá tính sau cùng. Chữ trên giao diện giúp người dùng hiểu, chọn và hành động; câu không làm được việc đó thì bỏ.

- Màn vận hành (quản trị, cài đặt, bảng số liệu): chữ để định hướng, báo trạng thái, dẫn tới hành động. Không khẩu hiệu, không câu truyền cảm hứng.
- Giọng ấm áp chỉ dùng ở trạng thái rỗng lần đầu, onboarding, lời mời nâng cấp, thông báo thành công quan trọng; một câu, sau đó quay về chức năng.

## 2. Nguyên tắc câu

| Nguyên tắc | Tránh | Nên |
|---|---|---|
| Động từ hơn danh từ | "Tiến hành đăng ký", "Thực hiện cấu hình" | "Đăng ký", "Cấu hình" |
| Dữ kiện hơn tính từ | "Xử lý nhanh chóng" | "Xử lý trong <n> phút", con số lấy từ PRD |
| Một câu một ý | "Lưu thành công và đơn đã được gửi tới quản lý để duyệt trong ngày" | "Đã lưu đơn hàng. Đơn đã gửi quản lý duyệt." |
| Điều xảy ra trước, chi tiết sau | "Do chưa nhập mã giảm giá hợp lệ nên không áp dụng được" | "Không áp dụng được mã giảm giá. Mã không hợp lệ." |
| Bỏ từ thừa | "Vui lòng hãy nhập đầy đủ thông tin email của bạn" | "Vui lòng nhập email" |

- Việc càng hệ trọng (thanh toán, xoá, bảo mật) giọng càng bình tĩnh, câu càng ngắn.
- Dùng tiếng Việt khi đã có từ thông dụng: "Lưu" thay cho "Save". Thuật ngữ giữ tiếng Anh theo content guide.
- Một khái niệm một từ trên mọi màn: cùng thao tác không lúc "Xoá" lúc "Gỡ". Cách đặt dấu (Huỷ hoặc Hủy) theo content guide, một sản phẩm dùng một cách.
- Chữ thật ngay từ UX Brief. Không dùng lorem ipsum hoặc "Text", "Label".
- Không hứa điều PRD không nói: thời gian, giới hạn, số lượng trong câu chữ phải có nguồn; chưa có thì `❓PO`.

## 3. Nút

Động từ cụ thể, kèm đối tượng khi cùng màn có nhiều đối tượng hoặc khi nút đứng riêng.

| Ngữ cảnh | Nên | Tránh |
|---|---|---|
| Tạo mới | "Tạo đơn hàng", "Thêm học viên" | "Create", "Add new", "Mới" |
| Lưu | "Lưu", "Lưu thay đổi" | "Save", "Submit" |
| Gửi biểu mẫu | "Gửi đăng ký" | "Submit", "OK" |
| Huỷ | "Huỷ" | "Cancel", "Back" |
| Xoá | "Xoá", "Xoá đơn hàng" | "Delete" |
| Tải về | "Tải chứng chỉ (PDF)" | "Download", "Tải" đứng một mình khi có nhiều loại tệp |

"Xác nhận", "Đồng ý" chỉ dùng khi không có động từ cụ thể hơn. Cặp nút trong hộp thoại: nút chính là động từ của thao tác, nút phụ là "Huỷ".

## 4. Thông báo lỗi

Ba phần: điều gì xảy ra, nguyên nhân khi có ích, việc cần làm tiếp. Không đưa mã lỗi trần; mã kỹ thuật cần cho bộ phận hỗ trợ thì đặt sau câu chính. Không đổ lỗi người dùng. Lỗi của trường đặt ngay dưới trường đó.

| Tình huống | Nên | Tránh |
|---|---|---|
| Bỏ trống trường bắt buộc | "Vui lòng nhập email" | "This field is required" |
| Sai định dạng | "Email không đúng định dạng. Ví dụ: ten@congty.vn" | "Invalid email" |
| Lưu không được do mạng | "Chưa lưu được. Kiểm tra kết nối mạng và thử lại." | "Error 500", "Lỗi hệ thống" |
| Tải dữ liệu thất bại | "Không tải được danh sách đơn hàng." kèm nút "Thử lại" | "Đã có lỗi xảy ra" khi biết nguyên nhân |
| Lỗi không rõ nguyên nhân | "Đã có lỗi xảy ra. Vui lòng thử lại." | "Error occurred" |
| Vi phạm rule nghiệp vụ | Nêu đúng rule của PO, ví dụ "Đợt đăng ký đã đóng ngày <ngày>." | Câu tự đặt khi PRD chưa có rule |

Lỗi nghiệp vụ lấy nội dung từ BR của PO và ghi mã. PRD chưa nói rule (độ dài tối đa, định dạng, điều kiện chặn): ghi `❓PO`, không tự đặt rule vào câu chữ.

## 5. Trạng thái rỗng

Nói vì sao rỗng và việc làm tiếp; một nút hành động, không nhiều hơn. Ba trường hợp của state Empty theo `screen-states.md` thường cần ba nội dung khác nhau.

| Trường hợp | Ví dụ | Hành động |
|---|---|---|
| Lần đầu, chưa có dữ liệu | "Chưa có đơn hàng nào. Đơn hàng mới sẽ hiển thị tại đây." | "Tạo đơn hàng" |
| Tìm hoặc lọc không ra | "Không tìm thấy đơn hàng phù hợp với bộ lọc." | "Xoá bộ lọc" |
| Đã xử lý toàn bộ | "Đã duyệt toàn bộ yêu cầu đăng ký." | Không cần, hoặc dẫn về danh sách chính |

- Ưu tiên "Chưa có <đối tượng> nào"; "Chưa có dữ liệu" chỉ dùng khi không xác định được đối tượng. Tránh "No data", "Empty".
- Không có quyền xem là state Permission: nói rõ lý do và người cần liên hệ, không dùng câu của trạng thái rỗng.

## 6. Loading và Success

- Loading: "Đang tải..."; thao tác chờ lâu thì nói việc đang làm: "Đang tạo chứng chỉ...". Tránh "Loading...".
- Success: nói việc đã xảy ra với đối tượng nào: "Đã lưu thay đổi", "Đã gửi đăng ký". Có việc tiếp theo thì nêu: "Đã gửi đăng ký. Kết quả duyệt sẽ gửi qua email." chỉ khi PRD có rule đó. Dấu chấm than theo giọng văn ở content guide.

## 7. Xác nhận thao tác không hoàn tác

| Phần | Nội dung | Ví dụ |
|---|---|---|
| Tiêu đề | Câu hỏi với động từ và đối tượng cụ thể | "Xoá đơn hàng DH-1024?" |
| Nội dung | Hậu quả cụ thể: dữ liệu nào mất, ai bị ảnh hưởng, có hoàn tác được không | "Đơn hàng và lịch sử xử lý sẽ bị xoá. Thao tác này không thể hoàn tác." |
| Nút chính | Lặp động từ của tiêu đề | "Xoá đơn hàng" |
| Nút phụ | "Huỷ" | "Huỷ" |

- Tránh câu chung chung "Bạn có chắc không?" không kèm hậu quả.
- Hậu quả lấy từ PRD. PRD không nói thao tác có kéo theo dữ liệu liên quan không: `❓PO`, không tự viết hậu quả. Thao tác hàng loạt nêu số lượng: "Xoá <n> đơn hàng đã chọn?".

## 8. Tiêu đề, nhãn, placeholder, helper text

- Tiêu đề mô tả nội dung: "Doanh thu tháng này", "Tiến độ học". Tránh "Khai phá tiềm năng tăng trưởng", "Hành trình của bạn bắt đầu tại đây". Phép thử: chỉ đọc tiêu đề, nhãn và con số mà hiểu được màn đang nói gì.
- Nhãn trường hiển thị cố định. Placeholder chỉ là ví dụ giá trị, không thay cho nhãn.
- Helper text nêu điều kiện nhập trước khi người dùng nhập sai, theo rule của PRD.
- Tooltip giải thích thuật ngữ hoặc lý do bị khoá; không đặt thông tin bắt buộc phải đọc vào tooltip.

## 9. Từ nên tránh

| Nhóm | Ví dụ | Xử lý |
|---|---|---|
| Tiếng Anh khi có từ Việt thông dụng | OK, Submit, Cancel, Loading, No data | Theo bảng ở mục 3 đến 6 |
| Từ thổi phồng không kèm dữ kiện | đột phá, vượt trội, liền mạch, mạnh mẽ, toàn diện | Thay bằng dữ kiện cụ thể hoặc bỏ |
| Từ đệm | rất, thực sự, chỉ cần, dễ dàng, đơn giản | Bỏ |
| Câu mở sáo rỗng | "Nâng tầm trải nghiệm", "Khám phá ngay", "Trải nghiệm hoàn toàn mới" | Nói việc cụ thể người dùng làm được |

## 10. Kiểm chuỗi dài nhất

- Mỗi nhãn, nút, ô dữ liệu thử với giá trị dài nhất thực tế: tên người, tên khoá học, địa chỉ, số tiền lớn. Độ dài tối đa lấy theo rule của PRD; chưa có thì ghi Assumption trong UX Brief và hỏi PO khi ảnh hưởng tới bố cục.
- Kiểm cách xử lý khi tràn: xuống dòng hoặc cắt bằng dấu ba chấm; chữ bị cắt có cách xem đầy đủ (tooltip, trang chi tiết).
- Nút không vỡ dòng ngoài ý muốn; cột bảng không bị đẩy lệch; chữ có dấu chồng (Ỗ, Ặ) không bị cắt mép trên.
- Ngày giờ, tiền tệ, số lớn theo định dạng ở content guide. Prototype có bộ dữ liệu chuỗi dài theo `prototyping.md`.

## 11. Cách trình nội dung chữ trong UX Brief

| Phần tử | Nội dung | Nguồn |
|---|---|---|
| Tiêu đề màn, tiêu đề vùng | | |
| Nhãn trường, placeholder, helper text | | |
| Nút | | |
| Thông báo rỗng, lỗi, thành công | | |
| Hộp xác nhận, tooltip | | |

Cột Nguồn ghi một trong ba: mã yêu cầu của PO khi PRD quy định câu chữ; content guide khi lấy từ câu mẫu của sản phẩm; Assumption khi AI soạn, Designer duyệt ở gate.

Câu AI tự kiểm trước khi trình:
- Người mới dùng đọc có hiểu ngay không?
- Mỗi nút có nói rõ việc xảy ra khi bấm không?
- Mỗi lỗi có nói cách sửa không?
- Mỗi trạng thái rỗng có lý do và việc làm tiếp không?
- Hộp xác nhận có nêu hậu quả không?
- Cắt bớt chữ có làm mất nghĩa không?
- Có câu nào hứa điều PRD không nói không?
- Thuật ngữ có khớp content guide không? Chuỗi dài nhất đã thử chưa?

## Nguồn

- `uiux-requirement-converter/SKILL.md` mục "Ví dụ UX writing tiếng Việt chuyên nghiệp" (bảng nên dùng, tránh dùng) và bảng phần tử UX writing đề xuất
- `refero-design/references/copywriting.md`: thứ tự rõ ràng, tôn trọng, cá tính; info-style; microcopy cho nút, lỗi, trạng thái rỗng; chữ trên giao diện sản phẩm; checklist trước khi đăng; danh sách từ cấm
- Hướng dẫn cũ của team: danh sách phần tử microcopy ở Step 5 (CTA, nhãn, helper text, thông báo lỗi) và mục kiểm "Microcopy có rõ ràng không" trước bàn giao

Đã bỏ hoặc sửa so với nguồn:
- Bỏ phần tiếp thị của copywriting.md (hero section, viết theo cảnh, nhịp câu, câu dễ nhớ): ngoài phạm vi chữ trên giao diện sản phẩm.
- Bỏ mọi ví dụ tiếng Anh; nguyên tắc chuyển sang tiếng Việt, danh sách từ cấm thay bằng nhóm từ tiếng Việt tương đương.
- Bỏ các con số không có nguồn trong copywriting.md (hiểu trong vài giây, cắt bớt một tỷ lệ, số câu "không" thì viết lại, thời gian trong ví dụ); con số trong câu chữ phải lấy từ PRD.
- Sửa "Chưa có dữ liệu" từ câu nên dùng thành câu dự phòng, ưu tiên nêu đối tượng.
- Sửa "Xác nhận", "Đồng ý" thành nhãn dự phòng; ưu tiên lặp động từ của thao tác theo copywriting.md.
- Giữ "Đã có lỗi xảy ra. Vui lòng thử lại." nhưng chỉ cho lỗi không rõ nguyên nhân, vì copywriting.md xếp câu chung chung là kém.
- Bỏ dấu chấm than trong câu mẫu thành công của bộ gốc; dùng hoặc không theo content guide.
- Thêm liên kết với `screen-states.md` (ba trường hợp Empty, tách Permission khỏi trạng thái rỗng) và quy tắc `❓PO` cho câu chữ phụ thuộc rule nghiệp vụ.
