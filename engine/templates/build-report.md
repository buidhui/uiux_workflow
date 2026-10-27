---
intent: <slug>
artifact: build-report
version: 0.1
status: pass | pending-fixes | blocked
ux_scope_version: <version của design-strategy đã dựng theo>
ux_brief_version: <version của ux-brief, nếu có>
built_by: <AI | Designer>
design_system_level: <1 | 2>
date: <YYYY-MM-DD>
---
# Build Report: <tên yêu cầu>

## 1. Frame
| Frame | Node ID | SCR | State | Breakpoint · mode |
|---|---|---|---|---|

## 2. Độ phủ scope
| Dòng scope | Node ID | Component (variant) | Trạng thái |
|---|---|---|---|
| SCR1 section 1 | | | Xong · GAP · Chưa |

## Ghi chú cho reviewer

## 3. Instance thư viện và frame tự dựng
| Phần | Nguồn | Lý do |
|---|---|---|
| | Thư viện · Thư viện khác · Frame tự dựng `~` · Frame thường theo spec (mức 1) | |

## 4. Kiểm cơ học
| # | Kiểm | Kết quả bằng số |
|---|---|---|
| S1 | Độ phủ scope | <n/n dòng> |
| S2 | Biến và giá trị thô | <n/n thuộc tính đã gán biến> |
| S3 | Chỉ dùng instance, không detach, không component bị bỏ | |
| S4 | Text style, nội dung thật, chữ có dấu không bị cắt | |
| S5 | Icon đúng nguồn, đúng kích thước, khoá tỉ lệ | |
| S6 | Mode và breakpoint đúng scope | |
| S7 | Accessibility cơ học: tương phản, vùng chạm, nhãn cho nút chỉ có icon | |
| S8 | Số đo bố cục: chiều rộng, lưới, không tràn, không đè | |
| S9 | Nhất quán với màn liền kề | |

## 5. Promote candidates
| Tên frame | Node | Dùng ở | Đánh giá tái sử dụng |
|---|---|---|---|

## 6. Assumption đã dán note cạnh frame

## 7. GAP đã gặp
| GAP | Xử lý tạm | Chuyển cho |
|---|---|---|

## 8. Limitation
- Prototype và tương tác chưa chạy thử
- Đánh giá heuristic sâu: chờ R1
- <khác>

## 9. Telemetry
Lệnh MCP: <n> · Lỗi kiểm cơ học bắt được: <n> · Vòng sửa: <n> · Phase: <n>

## 10. Còn lại
