# Checklist: D2 Design Strategy

## Từ PRD
- [ ] **[BLOCK]** Mỗi user story có giao diện trong PRD có ít nhất một màn; mỗi màn ghi user story nó phục vụ
- [ ] **[BLOCK]** Mỗi user task thuộc ít nhất một flow; mỗi bước flow có màn
- [ ] Màn hiển thị trạng thái của đối tượng khớp sơ đồ trạng thái của PRD
- [ ] Không sửa PRD; khác biệt nằm ở mục Ý kiến về PRD với lập trường và lý do

## Flow, màn, state
- [ ] **[BLOCK]** Có sơ đồ Mermaid, nhánh lỗi vẽ cùng
- [ ] **[BLOCK]** `mermaid-lint.mjs` không báo lỗi; máy không có Node thì đã rà theo bảng ở `diagram-protocol.md` mục 3 và ghi Limitation
- [ ] Mỗi sơ đồ tối đa 20 nút, có câu mô tả bằng chữ ngay dưới khối
- [ ] **[BLOCK]** Mỗi màn khai đủ bảy state, mỗi ô có, không kèm lý do, hoặc GAP
- [ ] **[BLOCK]** Lệnh "sửa tương tự" thành dòng mirror riêng
- [ ] Màn ngoài yêu cầu gốc đánh dấu chờ Designer quyết định

## Mức thiết kế và UI kit
- [ ] **[BLOCK]** Mỗi màn có mức và độ phức tạp kèm lý do; đã đối chiếu hướng dẫn dùng kit và gap log của sản phẩm
- [ ] Vùng chính của mỗi màn có component của kit; phần thiếu là GAP có xử lý tạm
- [ ] Màn L3 ghi rõ design ref đã có hoặc cần có
- [ ] Mọi màn L1 có UX Brief nén

## Trường hợp biên và accessibility
- [ ] **[BLOCK]** Độ sâu rà đúng theo từng màn
- [ ] Rule nghiệp vụ còn thiếu thành câu hỏi, không tự đặt
- [ ] Accessibility có mức và điểm cần lưu ý

## Bản đầy đủ
- [ ] **[BLOCK]** Mục 1 đến 7 đọc được độc lập, không thẻ nguồn, không từ quy trình, mã kèm nội dung
- [ ] **[BLOCK]** Bảng duyệt có mọi mục AI không được tự quyết định, chưa tự đánh dấu
- [ ] GAP mới đã vào gap log của sản phẩm
