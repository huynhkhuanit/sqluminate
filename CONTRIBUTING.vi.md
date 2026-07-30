# Hướng dẫn đóng góp cho SQLuminate

Cảm ơn bạn đã đóng góp cho SQLuminate. Tài liệu này hướng dẫn quy trình tạo nhánh, commit, review và merge dành cho nhóm phát triển.

Xem bản tiếng Anh tại [CONTRIBUTING.md](CONTRIBUTING.md).

## Mô hình nhánh

```text
main                         Mã nguồn ổn định, có thể phát hành
develop                      Nhánh tích hợp chung
review/milestone-*            Nhánh kiểm thử ứng viên phát hành
feat/*, fix/*, docs/*, ...    Nhánh làm việc ngắn hạn
```

- `main` phải luôn ổn định và build được. Không push trực tiếp vào nhánh này trong quy trình thông thường; thay đổi đi qua Pull Request.
- `develop` là nhánh đích mặc định cho các Pull Request về tính năng, sửa lỗi và tài liệu.
- `review/milestone-*` dùng để kiểm thử một milestone đã hoàn thành trước khi đưa vào `main`. Không phát triển tính năng trực tiếp trên nhánh review.
- Nhánh làm việc chỉ nên giải quyết một vấn đề rõ ràng và được xóa sau khi merge.

Với lỗi khẩn cấp trên phiên bản đang phát hành, tạo nhánh `hotfix/*` từ `main`. Sau khi review, merge bản sửa vào cả `main` và `develop`.

## Đặt tên nhánh

Dùng loại thay đổi và mô tả ngắn bằng kebab-case:

```text
feat/landing-page
feat/parser-boundary
fix/mobile-editor-height
docs/contributing-workflow
chore/update-dependencies
refactor/isolate-parser-adapter
test/add-cte-fixtures
hotfix/security-header
```

Không dùng tên chưa hoàn chỉnh như `feat/`; tên nhánh phải cho biết mục đích của thay đổi.

## Tạo nhánh mới

Luôn lấy nhánh mới nhất từ `develop` trước khi bắt đầu công việc:

```bash
git switch develop
git pull --ff-only origin develop
git switch -c feat/landing-page
```

Nếu nhánh đã tồn tại ở local và remote:

```bash
git switch feat/landing-page
git pull --ff-only origin feat/landing-page
```

Không bắt đầu tính năng thông thường từ `main` hoặc một nhánh review.

## Commit thay đổi

Giữ commit nhỏ, tập trung và dễ review. Dùng Conventional Commits:

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat: add landing page shell"
```

Các prefix thường dùng: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore` và `build`.

Không commit secret, file môi trường local, build output, trạng thái editor hoặc nội dung SQL của người dùng.

## Push nhánh

Push lần đầu và thiết lập upstream:

```bash
git push -u origin feat/landing-page
```

Các lần cập nhật sau chỉ cần:

```bash
git push
```

## Mở Pull Request

Tạo Pull Request từ nhánh làm việc vào `develop`:

```text
feat/landing-page -> develop
```

Nội dung PR nên có:

- Thay đổi gì và vì sao.
- Issue hoặc milestone liên quan, nếu có.
- Các lệnh kiểm tra đã chạy.
- Ảnh chụp màn hình hoặc video ngắn nếu thay đổi giao diện.
- Hạn chế hiện tại hoặc việc cần làm tiếp theo.

Trước khi yêu cầu review, chạy các kiểm tra phù hợp:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Chạy thêm `pnpm test:e2e` nếu thay đổi ảnh hưởng đến luồng người dùng.

## Vòng lặp review và cập nhật

Ít nhất một thành viên khác nên review PR. Sửa trên chính nhánh làm việc rồi push commit mới:

```bash
git add .
git commit -m "style: refine landing page responsive layout"
git push
```

Không force-push một nhánh mà thành viên khác đang sử dụng. Nếu `develop` đã có thay đổi mới, cập nhật nhánh bằng merge:

```bash
git fetch origin
git switch feat/landing-page
git merge origin/develop
```

Sau khi xử lý conflict, chạy lại kiểm tra, commit việc giải quyết conflict và push.

## Merge vào `develop`

Chỉ merge sau khi:

- Đã xử lý toàn bộ feedback review.
- Các kiểm tra bắt buộc đều pass.
- Thay đổi vẫn nằm trong phạm vi PR.
- Tài liệu và test đã được cập nhật khi cần.

Dùng **Squash and merge** cho các thay đổi tập trung để lịch sử `develop` dễ đọc. Xóa nhánh làm việc sau khi merge.

```bash
git push origin --delete feat/landing-page
git branch -d feat/landing-page
```

Nếu GitHub đã bật tự động xóa branch, không cần xóa remote branch thủ công.

## Đưa milestone lên `main`

Khi milestone hoàn thành, cập nhật nhánh review từ `develop`:

```bash
git switch review/milestone-0-1
git pull --ff-only origin review/milestone-0-1
git merge --ff-only origin/develop
git push origin review/milestone-0-1
```

Chạy toàn bộ bộ kiểm tra trên nhánh review, sau đó mở PR:

```text
review/milestone-0-1 -> main
```

Sau khi được duyệt và build thành công, merge PR vào `main`. Có thể tái sử dụng nhánh review cho milestone tiếp theo hoặc tạo nhánh `review/milestone-*` mới.

## Quy tắc bảo vệ GitHub nên bật

Đối với `main`:

- Bắt buộc thay đổi phải đi qua Pull Request.
- Yêu cầu ít nhất một người khác approve.
- Yêu cầu các check lint, type-check, test và build pass.
- Tắt force-push và không cho xóa nhánh.

Đối với `develop`, nên yêu cầu Pull Request và các check pass. Push trực tiếp chỉ nên dùng cho bảo trì repository khi các maintainer thống nhất.

## Phân biệt `git pull` và Pull Request

- `git pull` tải và tích hợp thay đổi vào nhánh local.
- **Pull Request** là yêu cầu để những người khác review và merge thay đổi từ nhánh này sang nhánh khác.

Quy trình thay đổi thông thường của SQLuminate:

```text
nhánh làm việc -> develop -> review/milestone-* -> main
```
