---
description: Stage E2 UI Design. AI dựng UI high fidelity theo design system trong khu vực nháp trên Figma, hoặc ghi nhận UI Designer dựng tay; tự kiểm S1 đến S9. Gọi qua /ux
argument-hint: <intent-slug>
---
# E2 UI Design

| | |
|---|---|
| Stage | E2 UI Design |
| Slug | ui-design |
| Phase | execution |
| Execution | Chỉ cho màn có đầu ra Figma + HTML. Mọi màn của intent đi làn chỉ HTML: ghi `[S] đầu ra chỉ HTML`, sang E3. AI dựng khi mức sẵn sàng design system từ 1 và màn được giao cho AI ở D2. Designer dựng tay thì ghi link frame và tự kiểm, không dựng |
| Produces | frame Figma trong khu vực nháp · `execution/ui-design/build-report.md` |
| Consumes | `design-strategy.md` (bắt buộc) · `ux-brief.md` khi E1 chạy · app-map |
| Requires | ux-brief, hoặc alignment khi E1 nén |
| Áp dụng | Màn có đầu ra Figma + HTML. Màn L1, L2: AI dựng được. Màn L3: Designer dẫn; AI chỉ làm phương án khám phá theo reference lock khi Designer yêu cầu |
| Reviewer | none, R1 là review |
| Archive | no; Figma giữ lịch sử bằng version có tên |
| Template | `engine/templates/build-report.md` |
| Checklist | `engine/verification/ui-design.md` |
| Knowledge | `engine/protocol/figma-protocol.md` · KB mục 5 (design system, kit, gap log), mục 6 (Figma), mục 8 (nội dung), `assets/` |

Chạy theo `engine/protocol/stage-protocol.md`. Mọi thao tác Figma theo `figma-protocol.md`. Tương ứng Step 6 trong tài liệu hướng dẫn cũ.

## Mục đích
UI draft đúng phạm vi, đúng design system, đủ state, và chứng minh bằng số đo. Không đánh giá heuristic sâu ở đây, đó là việc của R1.

## Load
- `design-strategy.md` đã duyệt; `ux-brief.md` nếu có. Version của hai file ghi vào build-report.
- Mức sẵn sàng design system: mức 2 dựng bằng instance; mức 1 dựng frame thường theo spec, đặt tên theo chức năng; mức 0 thì AI không dựng, Designer dựng tay.
- Phần việc chưa hoàn tất theo `figma-protocol.md` mục 2.

## Các bước khi AI dựng
1. Lưu version có tên trước khi ghi.
2. Component map từ chiến lược hoặc brief; đọc mô tả và khoảng trống trên Figma. Thiếu thì theo `figma-protocol.md` mục 5: dùng xử lý tạm đã ghi, chạy `/kit-proposal` để đề xuất bổ sung kit; frame tự dựng chỉ khi Designer cho phép.
3. Phase plan cho màn trên bốn section hoặc trên ba state; Designer duyệt plan.
4. Dựng trong khu vực nháp; CR trên màn đang chạy thì sửa bản nhân bản.
5. Chữ tiếng Việt thật; thử chuỗi dài nhất.
6. Tự kiểm S1 đến S9 sau mỗi section và toàn màn. Cùng lỗi sửa hỏng hai lần thì dừng.
7. Điểm dừng cuối mỗi phase: ảnh chụp và số đo. Góp ý của Designer ở đây sửa ngay trong phase.

## Khi Designer dựng tay
Ghi link frame theo màn vào `state.md`. AI chạy tự kiểm bằng cách đọc Figma, ghi kết quả vào build-report để Designer sửa trước khi sang R1.

Domain mức 0 chưa có luật design system viết ra, nên chỉ chạy S1 (độ phủ), S4 (chữ), S6 (breakpoint), S7 (accessibility cơ học), S8 (bố cục), S9 (nhất quán với màn liền kề). S2, S3, S5 ghi N/A kèm lý do.

## Generate
`build-report.md`: frame và node, độ phủ từng dòng scope, phần instance thư viện và phần tự dựng kèm lý do, kết quả S1 đến S9 bằng số, Promote candidates, `GAP`, Limitation, ghi chú cho reviewer. `GAP` và Promote candidate mới vào gap log của sản phẩm; phần cần có trong kit thì `/kit-proposal`.

## Kết thúc
Không có gate riêng: UI draft xong thì sang E3 Prototype, sau đó R1 nơi có UI Gate. Nói một dòng: số màn và state đã dựng, kết quả tự kiểm, link khu vực nháp.
