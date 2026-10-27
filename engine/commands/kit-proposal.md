---
description: Đề xuất bổ sung component vào UI kit của sản phẩm khi thiết kế gặp phần tử kit chưa có. Chỉ đề xuất; việc dựng kit do người phụ trách kit quyết định
argument-hint: <mô tả phần tử còn thiếu> [màn, intent]
---
# /kit-proposal

UI kit của sản phẩm do người phụ trách kit dựng và duyệt. Luồng này không dựng kit. Khi thiết kế gặp phần tử kit chưa có, lệnh này viết một đề xuất rõ ràng để đưa vào kit, dùng công cụ dựng kit mà KB mục 5 khai (ví dụ một skill dựng kit chạy ở bước đề xuất, sau đó dừng).

## Khi nào chạy
- D2: phần tử chắc chắn thiếu, thấy được từ PRD.
- E1: Designer chọn một đề xuất component cho màn L2.
- E2, R1: phát hiện khi dựng hoặc khi review.
Designer cũng gọi trực tiếp được.

## Các bước
1. Tìm trước: kit usage và gap log của sản phẩm; thư viện kit trên Figma theo nhiều tên đồng nghĩa; design system gốc nếu KB khai. Có, sau đó thì báo cách dùng, dừng.
2. Kiểm gap log: đã có mục cho phần tử này thì cập nhật nơi gặp, không tạo mục mới.
3. Viết đề xuất: tên, mục đích, nơi dùng (intent, màn), dạng (dùng lại một component của design system gốc, hoặc ghép từ component có sẵn), property và variant tối thiểu, state, ràng buộc responsive và accessibility, xử lý tạm trong lúc chờ.
4. Ghi mục mới vào gap log của module theo định dạng của nó, trạng thái đã đề xuất. Module chưa khai nơi lưu gap log, hoặc không mở được: ghi vào `domain/gap-log.md` và báo Designer một dòng.
5. Có công cụ dựng kit (KB mục 5): chuyển đề xuất cho công cụ đó ở chế độ đề xuất, dừng ở bước đề xuất của nó. Không tạo component khi người phụ trách kit chưa yêu cầu.
6. Báo Designer: đề xuất ở đâu, người cần duyệt, xử lý tạm cho màn đang làm.

## Không làm
Không tạo hoặc sửa component trong kit hoặc design system. Không vẽ tay phần thiếu lên màn. Không đổi thiết kế của component gốc bằng override trên màn.
