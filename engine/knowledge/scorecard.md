# Scorecard của Design Review

Dùng ở R1 và `/ux-review` (chế độ design review), do agent `ux-lead` chấm. Bảng điểm giúp người đọc biết trong một lần nhìn thiết kế đang ở mức nào và bước tiếp theo là gì. Trọng số bảy trục giữ theo bộ gốc. Mọi con số về mức trừ, sàn, trần, luật trần và ngưỡng verdict trong file này là đề xuất, chưa hiệu chỉnh; cách hiệu chỉnh ở mục cuối. Sản phẩm có điều chỉnh riêng thì ghi ở Product KB mục 9; agent áp điều chỉnh đó thay cho số trong file này.

## Bảy trục

| Trục | Trọng số | Chấm gì | N/A khi |
|---|---|---|---|
| Requirement fit | 25 | Màn, trường, hành động, state khớp `design-strategy.md`, `ux-brief.md` và mã yêu cầu `[req:...]` | Không có scope để đối chiếu, ví dụ `/ux-review --shadow` |
| Flow và IA | 15 | Đi trọn từng flow trong `flow-map.md` không lạc, không cụt; vị trí màn trong cấu trúc app | Không có nguồn để đối chiếu, ghi lý do |
| Heuristic | 15 | Mười heuristic và cognitive walkthrough theo `heuristics.md` | Không có nguồn để đối chiếu, ghi lý do |
| Visual hierarchy | 10 | Phân cấp thị giác, mật độ, điểm nhấn; màn L3 thêm phần bám reference lock. Phần lớn là nhận xét bằng mắt nên trọng số thấp hơn các trục đo được | Không có nguồn để đối chiếu, ghi lý do |
| Consistency với design system | 15 | Biến, text style, component, khoảng cách theo design system của domain (KB mục 5); pattern của màn liền kề | Domain ở mức sẵn sàng design system 0 |
| Accessibility | 15 | Tương phản, vùng chạm, focus, nhãn, màu không là tín hiệu duy nhất theo `accessibility.md` | Không đo được số liệu (không có công cụ đọc Figma) |
| Responsive và nội dung | 5 | Breakpoint của design system, chữ tiếng Việt dài, nội dung chữ theo `ux-writing-vi.md` và KB mục 8 | Không có nguồn để đối chiếu, ghi lý do |

Quy tắc ghi finding để chấm:
- Mỗi finding thuộc đúng một trục, là trục gần nguyên nhân nhất. Một lỗi không bị trừ ở hai trục.
- Cùng một lỗi lặp ở nhiều vị trí do cùng một nguyên nhân (ví dụ cả bảng dùng sai một text style) là một finding, liệt kê đủ các vị trí. Bộ gốc xếp lỗi lệch design system có hệ thống vào mức Major; tách thành nhiều finding làm phồng số trừ.
- Điểm tính trên finding còn mở lúc chấm. Finding Designer bác (`Rejected`) không tính; finding được chấp nhận rủi ro (Accepted risk) vẫn tính.
- `GAP` của design system không tính là lỗi của Designer: ghi ở mục GAP của `design-review.md` và ở ghi chú trục, không trừ điểm.

## Mức độ finding

| Mức | Nghĩa | Bằng chứng tối thiểu |
|---|---|---|
| Critical | Chặn người dùng hoàn thành task, có nguy cơ mất dữ liệu, sai yêu cầu ở điểm chính, hoặc chữ nội dung chính dưới ngưỡng tương phản theo `accessibility.md` | Số đo, mã yêu cầu được trích, hoặc bước flow bị chặn chỉ ra được |
| Major | Trải nghiệm hỏng rõ, người dùng dễ hiểu sai hoặc thao tác sai; lệch design system có hệ thống | Số đo hoặc Visual judgment |
| Minor | Hoàn thiện chi tiết, không cản trở task | Số đo hoặc Visual judgment |

Nhận xét bằng mắt (Visual judgment) không được dùng làm finding Critical; mức cao nhất của loại này là Major. Agent thấy bằng mắt một vấn đề có vẻ nghiêm trọng hơn thì ghi Major, kèm đề xuất cách đo hoặc cách kiểm với người dùng để xác nhận.

## Cách trừ điểm

Ký hiệu cho một trục:
- `W`: trọng số của trục.
- `n`: số màn được review. Mỗi mã SCR là một màn; frame state của cùng một màn không tính thêm; `n` nhỏ nhất là 1.
- `k`: số finding còn mở của một mức trên trục đó.
- `r`, `sàn`, `trần`: tham số của từng mức, tính theo phần trăm `W`.

```
Mức trừ của một mức:
  T = 0                                  khi k = 0
  T = min(trần, max(sàn, r × k / n))     khi k > 0, với Major và Minor
  T = min(trần, r × k)                   khi k > 0, với Critical (không chia n)

Điểm trục = W × (1 − min(100%, T_Critical + T_Major + T_Minor))
Tổng      = (tổng điểm các trục áp dụng) / (tổng trọng số các trục áp dụng) × 100
```

| Mức | r mỗi finding (giữ của bộ gốc) | Chia cho n | Sàn (đề xuất) | Trần (đề xuất) |
|---|---|---|---|---|
| Critical | 60% | Không | Không áp | 100% |
| Major | 25% | Có | 12,5% | 75% |
| Minor | 8% | Có | 4% | 25% |

Trục N/A bị loại khỏi cả tử số và mẫu số, sau đó quy đổi lại thang 100; không cho điểm miễn phí. Tính bằng số chưa làm tròn; bảng hiển thị điểm trục một chữ số thập phân, tổng làm tròn số nguyên.

Lý do của từng phần (đề xuất):
- Critical không chia `n`: một lỗi chặn task vẫn chặn task dù intent có một hoặc mười màn.
- Major và Minor chia `n`: đo mật độ lỗi trên mỗi màn. Mười màn, mỗi màn một Minor, bị trừ bằng một màn có một Minor.
- Sàn bằng một nửa `r`: intent nhiều màn vẫn bị trừ đáng kể khi có lỗi. Không có sàn, một Major trên hai mươi màn chỉ trừ hơn 1%.
- Trần: Minor dồn lại không vượt một phần tư trục, Major không vượt ba phần tư. Một màn lớn nhiều chi tiết nhỏ không bị đưa về 0. Trục về 0 chỉ khi có Critical, hoặc khi Major và Minor cùng chạm trần.

Ví dụ 1, mười ba Minor trên một màn, trục Consistency (`W` = 15, `n` = 1). Bộ gốc: 13 × 8% = 104%, trục còn 0. Công thức mới: min(25%, max(4%, 8% × 13 / 1)) = 25%, trục còn 15 × 0,75 = 11,3.

Ví dụ 2, trục Accessibility (`W` = 15, `n` = 6) có một Critical, ba Major, bốn Minor. Critical: 60% × 1 = 60%. Major: max(12,5%, 25% × 3 / 6) = 12,5%. Minor: max(4%, 8% × 4 / 6) = 5,3%. Tổng trừ 77,8%, trục còn 3,3. Bộ gốc: 60% + 75% + 32% = 167%, trục còn 0.

Ví dụ 3, review shadow hai màn (`n` = 2), không có scope:

| Trục | W | Finding còn mở | Trừ | Điểm |
|---|---|---|---|---|
| Requirement fit | 25 | N/A, không có scope | | N/A |
| Flow và IA | 15 | 1 Major | max(12,5%, 25% × 1 / 2) = 12,5% | 13,1 |
| Heuristic | 15 | 2 Minor | max(4%, 8% × 2 / 2) = 8% | 13,8 |
| Visual hierarchy | 10 | 1 Major, Visual judgment | 12,5% | 8,8 |
| Consistency với design system | 15 | 0 | 0 | 15 |
| Accessibility | 15 | 1 Critical | 60% | 6 |
| Responsive và nội dung | 5 | 1 Minor | max(4%, 8% × 1 / 2) = 4% | 4,8 |

Tổng: 61,475 / 75 × 100 = 82, tức CONDITIONAL PASS theo điểm. Còn một Critical chưa sửa nên luật trần đưa tổng về 69, verdict NEEDS REWORK. Sửa xong Critical, Accessibility về 15, tổng 70,475 / 75 × 100 = 94, PASS.

## Luật trần

Áp sau khi tính tổng, bất kể điểm bao nhiêu. Hai luật cùng áp thì lấy trần thấp hơn.
- Còn ít nhất một Critical chưa sửa: tổng tối đa 69, verdict cao nhất là NEEDS REWORK.
- Điểm trục Requirement fit dưới 50% trọng số: tổng tối đa 59. Trục này N/A thì luật không áp.

## Verdict

| Tổng (đề xuất) | Verdict | Bước tiếp ở R1 |
|---|---|---|
| 85 đến 100 | PASS | Trình UI Gate |
| 70 đến 84 | CONDITIONAL PASS | Sửa finding Must fix, chấm lại các trục bị trừ, sau đó trình UI Gate |
| 50 đến 69 | NEEDS REWORK | Sửa thiết kế theo finding, có thể xuất `fix-prompt.md`; sửa xong chấm lại các trục bị trừ |
| Dưới 50 | FAIL | Sửa lớn; xem lại UX Brief hoặc chiến lược. Lỗi nằm ở yêu cầu thì ghi `❓PO`; phải đổi chiến lược đã đồng thuận thì chuyển `/change-request` |

Chấm lại chỉ gồm các trục có finding vừa sửa, trừ khi thiết kế đổi lớn. Mỗi lần chấm lại là một version mới của `design-review.md`.

## Trình bày bảng điểm

Theo `engine/templates/design-review.md`, bảng điểm đứng trên phần finding:
- Mỗi trục đúng một dòng ghi chú. Ghi `n` và danh sách mã màn ngay dưới bảng.
- Trục N/A ghi lý do và cho biết tổng đã quy đổi lại.
- Ba việc nâng điểm nhanh nhất: chọn từ finding có tỷ lệ điểm tổng tăng thêm trên công sức sửa cao nhất; điểm tăng dự kiến tính lại bằng công thức trên.
- Verdict đi kèm bước tiếp cụ thể theo bảng Verdict.

Tự kiểm trước khi trả bảng điểm:
- Tổng tính trên mẫu số đã bỏ trục N/A.
- `n` khớp danh sách màn đã review.
- Luật trần đã áp.
- Không finding Visual judgment nào ở mức Critical.
- `GAP` của design system không bị trừ vào điểm Designer.
- Ba việc nâng điểm lấy từ finding có thật, điểm tăng tính lại được.

## Hiệu chỉnh

1. Chọn bộ màn mẫu, đề xuất sáu đến mười màn đã qua R1, có đủ L1, L2, L3, có cả màn team đánh giá tốt và màn chưa tốt.
2. Agent `ux-lead` chấm theo file này. Ít nhất một Designer, tốt nhất là hai, chấm độc lập cùng bộ màn: finding và mức, điểm từng trục, verdict mình cho là đúng. Designer không xem bảng của agent trước khi chấm xong.
3. So theo ba lớp: finding (cùng vấn đề, cùng mức), điểm trục, verdict.
4. Sửa theo thứ tự: lệch ở mức finding thì sửa định nghĩa mức trước; agent trừ nặng hoặc nhẹ đều tay ở một mức thì chỉnh `r`, sàn, trần của mức đó; điểm gần nhau mà verdict lệch thì chỉnh ngưỡng verdict.
5. Đạt khi (đề xuất): verdict của agent khớp Designer ở ít nhất tám trên mười màn, và chênh lệch tổng trung bình không quá năm điểm. Chưa đạt thì lặp lại với bộ màn khác.
6. Ghi ngày, bộ màn, số cũ, số mới; sửa file này ở repo engine và đổi tình trạng trong `engine/knowledge/README.md` thành "Đã viết, đã hiệu chỉnh". Điều chỉnh chỉ đúng cho một sản phẩm thì ghi ở KB mục 9, không sửa file này.

## Nguồn

- `claude-skills-uiux-vic/vic-design-final-review/references/scorecard.md` mục 1: bảy trục, trọng số, trục N/A loại khỏi mẫu số, mức trừ 60%, 25%, 8%, hai luật trần 69 và 59
- `claude-skills-uiux-vic/vic-design-final-review/references/scorecard.md` mục 2: bốn verdict và ngưỡng 85, 70, 50
- `claude-skills-uiux-vic/vic-design-final-review/references/scorecard.md` mục 3: một dòng ghi chú mỗi trục, ba việc nâng điểm, verdict kèm bước tiếp
- `claude-skills-uiux-vic/vic-design-final-review/references/scorecard.md` mục 5: các câu tự kiểm
- `claude-skills-uiux-vic/vic-design-final-review/SKILL.md` nguyên tắc 1, 4, 5: đo số thật, tách số đo khỏi nhận xét bằng mắt, định nghĩa ba mức
- Sửa: trừ cố định theo phần trăm mỗi finding thay bằng công thức chia theo số màn `n` cho Major, Minor, kèm sàn và trần từng mức; giữ nguyên `r` của bộ gốc
- Sửa: hành động sau verdict trỏ tới test case và handoff của bộ gốc thay bằng bước của R1, UI Gate, `/change-request`
- Thêm: Visual judgment cao nhất là Major; gộp lỗi lặp cùng nguyên nhân thành một finding; mục Hiệu chỉnh
- Bỏ: biểu tượng màu của verdict, ví dụ bảng điểm dùng tên biến và tên sản phẩm của bộ gốc
- Bỏ: mục 4 luồng fix-prompt, đã có ở `engine/templates/fix-prompt.md` và R1
