# Trực quan hoá dữ liệu

Dùng ở D2 (chọn dạng biểu đồ cho màn báo cáo, dashboard), E1 (UX Brief của màn có biểu đồ) và R1 (trục Requirement fit, Accessibility). Mục tiêu: chọn dạng biểu đồ theo câu hỏi người dùng cần trả lời, không theo sở thích hình ảnh; mỗi biểu đồ có state đầy đủ và có cách đọc không phụ thuộc màu.

## 1. Bắt đầu từ câu hỏi

Trước khi chọn biểu đồ, ghi một câu: người dùng nhìn vào để trả lời câu hỏi gì, và sau đó làm gì. Câu hỏi lấy từ PRD; PRD chỉ ghi "có biểu đồ" mà không nêu câu hỏi thì ghi `❓PO`.

| Câu hỏi của người dùng | Dạng dữ liệu | Biểu đồ nên dùng | Phương án thay thế |
|---|---|---|---|
| Chỉ số tăng hay giảm theo thời gian | Xu hướng theo thời gian | Đường | Vùng |
| Nhóm nào lớn nhất, xếp hạng ra sao | So sánh các nhóm | Cột hoặc thanh ngang, sắp giảm dần | Cột nhóm |
| Một phần chiếm bao nhiêu trong tổng | Phần trong tổng | Tròn hoặc vành khuyên | Thanh xếp chồng 100%, ô vuông (waffle) |
| Hai đại lượng có liên quan không, có cụm hay điểm bất thường | Tương quan, phân bố | Phân tán (scatter), bong bóng | Bản đồ nhiệt dạng lưới |
| Hoạt động dồn vào giờ nào, ngày nào | Cường độ trên lưới hai chiều | Bản đồ nhiệt | Bong bóng trên lưới |
| Bao nhiêu người đi tiếp qua từng bước, rơi rụng ở đâu | Phễu theo bước tuần tự | Phễu | Thác nước |
| Một chỉ số đạt bao nhiêu so với mục tiêu | Một KPI so với mục tiêu | Bullet, đồng hồ (gauge) | Thanh tiến độ |
| Nhiều KPI so với mục tiêu, đặt cạnh nhau | Nhiều KPI so với mục tiêu | Lưới bullet | Bảng có cột trạng thái |
| Tổng thay đổi do những khoản cộng, trừ nào | Thay đổi tích luỹ | Thác nước | Cột xếp chồng |
| Cơ cấu nhiều cấp, phần nào lớn | Dữ liệu phân cấp có tỉ lệ | Treemap | Sunburst |
| Số liệu dao động ra sao, trung vị, ngoại lai | Phân bố thống kê | Hộp (box plot) | Violin |
| Thời điểm nào có giá trị bất thường | Phát hiện bất thường theo thời gian | Đường có đánh dấu điểm bất thường | Danh sách sự kiện bất thường |
| Phân bố theo vùng địa lý | Dữ liệu địa lý | Bản đồ tô màu theo vùng | Bảng theo vùng |
| Lượng chuyển từ nguồn nào sang đích nào | Dòng chảy giữa các nút | Sankey | Bảng nguồn và đích |
| Nhiều đối tượng so trên cùng bộ thuộc tính | So sánh nhiều biến | Cột nhóm | Radar (chỉ khi người đọc quen) |
| Chỉ số thay đổi do những yếu tố nào | Phân rã nguyên nhân | Cây phân rã | Bảng mở rộng theo cấp |
| Giá trị hiện tại của dữ liệu cập nhật liên tục | Theo dõi thời gian thực | Vùng cập nhật liên tục, có nút tạm dừng | Bảng giá trị gần nhất |

Biểu đồ chuyên dụng (nến cho dữ liệu tài chính, biểu đồ ba chiều, đám mây từ, bản đồ quy trình từ nhật ký sự kiện) chỉ dùng khi PRD nêu rõ nhu cầu và người dùng quen đọc; ghi lý do trong `design-strategy.md`.

## 2. Khi nào không dùng

Theo nguồn, các ngưỡng dưới đây là quy tắc thực hành, không phải chuẩn; sản phẩm có quy định khác thì theo Product KB mục 5.

| Biểu đồ | Không dùng khi | Thay bằng |
|---|---|---|
| Đường | Dưới 4 điểm dữ liệu; trên 6 chuỗi; không có trục thời gian | Thẻ số liệu; tách biểu đồ hoặc cho chọn chuỗi; cột |
| Cột, thanh | Trên 15 nhóm; dữ liệu có trục thời gian; cần thể hiện tỉ lệ | Bảng có tìm kiếm; đường; thanh xếp chồng |
| Tròn, vành khuyên | Trên 5 nhóm; các phần chênh nhau dưới 5%; người dùng cần giá trị chính xác | Thanh xếp chồng 100%; bảng |
| Phân tán | Biến là dạng nhóm; dưới 20 điểm; màn chủ yếu dùng trên di động | Cột nhóm; bảng |
| Bản đồ nhiệt | Dưới 20 ô; người dùng cần đọc giá trị chính xác | Cột; bảng |
| Phễu | Các bước không tuần tự; giá trị không giảm dần; dưới 3 bước | Cột |
| Đồng hồ (gauge) | Không có mục tiêu; so nhiều KPI cùng lúc | Lưới bullet |
| Thác nước | Các khoản không cộng dồn được; trên 12 cột | Gộp khoản nhỏ thành "Khác" |
| Treemap, sunburst | Trên 3 cấp; cần so chính xác giữa các phần cùng cấp | Bảng dạng cây |
| Radar | Trên 8 trục; cần so chính xác; người đọc không quen | Cột nhóm |

Dashboard có nhiều thẻ số liệu và biểu đồ: mỗi khối trả lời một câu hỏi; khối không gắn với câu hỏi nào trong PRD là ứng viên bỏ hoặc đưa vào Nice-to-have.

## 3. Màu và nhãn

- Màu của biểu đồ lấy từ bảng màu dành cho dữ liệu trong design system của sản phẩm (Product KB mục 5). Design system chưa có bảng màu dữ liệu: ghi `GAP`, không tự chọn mã màu.
- Không phân biệt chuỗi, nhóm, trạng thái chỉ bằng màu (WCAG 1.4.1). Kết hợp thêm nhãn trực tiếp, kiểu đường (liền, đứt, chấm), hình điểm, hoa văn, hoặc ký hiệu tăng, giảm.
- Thành phần đồ hoạ cần để hiểu biểu đồ (đường, cột, điểm đánh dấu) có tương phản từ 3:1 với nền liền kề (1.4.11); chữ trên biểu đồ theo 1.4.3. Chi tiết ở `accessibility.md`.
- Biểu đồ tròn ghi phần trăm trên từng phần; cột sắp xếp theo giá trị khi thứ tự nhóm không mang nghĩa.
- Đỏ, vàng, xanh cho ngưỡng tốt, xấu luôn kèm chữ trạng thái và số.
- Trục, đơn vị, mốc thời gian, nguồn và thời điểm cập nhật dữ liệu ghi rõ trên khối biểu đồ.

## 4. Phương án đọc không cần nhìn biểu đồ

Mỗi biểu đồ có một phương án thay thế để người dùng trình đọc màn hình, người dùng bàn phím và người cần số chính xác đều dùng được:
- Bảng dữ liệu xem được (nút "Xem dạng bảng" hoặc bảng bên dưới), cộng một câu tóm tắt ý chính, ví dụ "Đơn hàng tháng 6 tăng 12% so với tháng 5".
- Giá trị hiện khi rê chuột cũng hiện khi phần tử nhận focus bằng bàn phím.
- Thao tác chỉ làm được bằng kéo (chọn vùng, kéo nút) có nút thay thế: phóng to, thu nhỏ, đặt lại, ô nhập khoảng.
- Dữ liệu cập nhật liên tục có nút tạm dừng và không cướp focus khi cập nhật.

Với biểu đồ có rủi ro cao về accessibility (tròn nhiều phần, treemap, sunburst, mạng lưới, đám mây từ), phương án bảng là cách đọc chính; biểu đồ là phần bổ sung.

## 5. State của khối biểu đồ

Khối biểu đồ khai đủ bảy state theo `screen-states.md`, với các điểm riêng:

| State | Điểm riêng của biểu đồ |
|---|---|
| Empty | Phân biệt chưa có dữ liệu, bộ lọc không ra kết quả, khoảng thời gian không có số liệu; không vẽ trục trống không giải thích |
| Loading | Khung tạm (skeleton) đúng kích thước khối để bố cục không nhảy |
| Error | Nói phần nào không tải được và cách thử lại; các khối khác trên dashboard vẫn hiển thị |
| Permission | Vai không được xem số liệu: ẩn khối hoặc hiện thông báo theo cách xử lý quyền ở `edge-case-sweep.md` |
| Dữ liệu ít hoặc một điểm | Thay bằng thẻ số liệu theo bảng ở mục 2 |
| Dữ liệu quá nhiều | Gộp nhóm nhỏ thành "Khác", phân trang, hoặc cho lọc; ghi rõ đã gộp |

## 6. Mức thiết kế và GAP

- Kit có component biểu đồ đúng dạng cần dùng và màn chỉ ghép biểu đồ có sẵn: màn có thể ở L1.
- Kit chưa có dạng biểu đồ cần dùng, hoặc chưa có bảng màu dữ liệu: ghi `GAP`, chạy `/kit-proposal`, màn tối thiểu L2 theo `design-levels.md`.
- Dashboard tổng quan cần gây ấn tượng hoặc tạo khác biệt: xét L3 theo `design-levels.md`.
- Thư viện vẽ biểu đồ trong code, cách vẽ khi dữ liệu lớn (SVG, Canvas, gộp trước khi vẽ) là việc của Dev; ghi chú bàn giao chỉ ghi ngưỡng gộp và hành vi người dùng thấy.

## 7. Câu kiểm trước khi trình gate

- Mỗi biểu đồ có câu hỏi của người dùng, truy vết về mã yêu cầu trong PRD.
- Dạng biểu đồ khớp bảng ở mục 1, không rơi vào trường hợp "không dùng" ở mục 2; lệch thì có lý do.
- Không có thông tin chỉ truyền bằng màu; màu lấy từ design system hoặc ghi `GAP`.
- Có phương án bảng và câu tóm tắt.
- Đủ state theo mục 5.

## Nguồn

- `ui-ux-pro-max-skill` (Next Level Builder, giấy phép MIT), `src/ui-ux-pro-max/data/charts.csv`: 25 dạng dữ liệu, biểu đồ nên dùng và thay thế, khi nào không dùng, phương án accessibility và bàn phím.
- WCAG 2.2 của W3C: 1.4.1, 1.4.3, 1.4.11; chi tiết ở `accessibility.md`.
- Đã bỏ: mã màu cố định của nguồn (màu lấy từ design system của sản phẩm); ngưỡng hiệu năng và thư viện vẽ (SVG, Canvas, WebGL, tên thư viện) vì là việc của Dev; điểm accessibility dạng chữ cái đã bị nguồn đánh dấu ngừng dùng.
- Đã sửa: các ngưỡng số lượng của nguồn giữ lại như quy tắc thực hành, ghi rõ là theo nguồn, sản phẩm được phép đổi.
- Đã thêm: bắt đầu từ câu hỏi trong PRD, state của khối biểu đồ, quy tắc mức thiết kế và GAP, câu kiểm trước gate.
