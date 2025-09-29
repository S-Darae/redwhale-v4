import "../../components/button/button.js";
import "../../components/tooltip/tooltip.js";
import "./popover-common.js";

/**
 * Membership Detail Popover 생성
 * 👉 예약 미사용(`reserv-unused`)인 경우, "예약 가능한 수업" 영역은 표시하지 않음
 */
export function createMembershipDetailPopover({
  folderName,
  membershipName,
  badge,
  badgeVariant,
  info = [],
  details = [],
  memo = "",
  tickets = [],
}) {
  // ✅ info 처리
  const infoHTML = Array.isArray(info)
    ? info
        .map(
          (i) => `<li class="membership-detail-popover__info-item">${i}</li>`
        )
        .join("")
    : info
    ? `<li class="membership-detail-popover__info-item">${info}</li>`
    : "";

  // ✅ details 처리
  const detailsHTML =
    details && details.length
      ? details
          .map((row) => {
            if (!Array.isArray(row) && typeof row === "object") {
              return `
                <ul class="membership-detail-popover__detail">
                  <li>${row.period || ""}</li>
                  <li>
                    ${row.count || ""}
                    ${row.cancel ? `<span>(${row.cancel})</span>` : ""}
                  </li>
                  <li>${row.price || ""}</li>
                </ul>
              `;
            }
            if (Array.isArray(row)) {
              const [period, count, price] = row;
              if (typeof count === "object") {
                return `
                  <ul class="membership-detail-popover__detail">
                    <li>${period || ""}</li>
                    <li>
                      ${count.text || ""}
                      ${count.cancel ? `<span>(${count.cancel})</span>` : ""}
                    </li>
                    <li>${price || ""}</li>
                  </ul>
                `;
              }
              return `
                <ul class="membership-detail-popover__detail">
                  <li>${period || ""}</li>
                  <li>${count || ""}</li>
                  <li>${price || ""}</li>
                </ul>
              `;
            }
            return "";
          })
          .join("")
      : `<ul class="membership-detail-popover__detail"><li class="empty-text">-</li></ul>`;

  // ✅ tickets 처리 (예약 미사용이면 null 반환)
  const ticketsHTML =
    badgeVariant === "reserv-unused"
      ? "" // 예약 미사용 → 아예 영역 숨김
      : tickets.length
      ? tickets
          .map(
            (group) => `
          <div class="membership-detail-popover__ticket-group">
            <div class="membership-detail-popover__ticket-folder-name">
              ${group.folderName} <span>${group.items.length}</span>
            </div>
            <div class="membership-detail-popover__ticket-list">
              ${group.items
                .map(
                  (t) =>
                    `<div class="membership-detail-popover__ticket-item">${t}</div>`
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")
      : `<div class="membership-detail-popover__ticket-list empty-text">-</div>`;

  // ✅ 최종 반환
  return `
    <aside class="membership-detail-popover visible">
      <div class="membership-detail-popover__header">
        <div class="membership-detail-popover__membership-color"></div>
        <div class="membership-detail-popover__btns">
          <button class="btn--icon-utility" data-tooltip="복제" aria-label="복제">
            <div class="icon--copy icon"></div>
          </button>
          <button class="btn--icon-utility" data-tooltip="정보 수정" aria-label="정보 수정">
            <div class="icon--edit icon"></div>
          </button>
          <button class="btn--icon-utility" data-tooltip="삭제" aria-label="삭제">
            <div class="icon--trash icon"></div>
          </button>
          <button class="btn--icon-utility x-btn" aria-label="닫기">
            <div class="icon--x icon"></div>
          </button>
        </div>
      </div>

      <div class="membership-detail-popover__body">
        <!-- 메인 정보 -->
        <div class="membership-detail-popover__body-main">
          <ul class="membership-detail-popover__body-main-name">
            <li class="membership-detail-popover__folder-name">${folderName}</li>
            <li class="membership-detail-popover__membership-name">${membershipName}</li>
          </ul>

          <ul class="membership-detail-popover__info">
            <li class="membership-detail-popover__badge membership-detail-popover__badge--${badgeVariant}">
              ${badge}
            </li>
            ${infoHTML || `<li class="empty-text"></li>`}
          </ul>

          <div class="membership-detail-popover__details">
            ${detailsHTML}
          </div>
        </div>

        <!-- 서브 정보 -->
        <div class="membership-detail-popover__sub">
          <div class="membership-detail-popover__sub-memo-wrap">
            <div class="membership-detail-popover__sub-content-title">메모</div>
            <div class="membership-detail-popover__memo-content ${
              memo ? "" : "empty-text"
            }">${memo || "-"}</div>
          </div>

          ${
            badgeVariant === "reserv-unused"
              ? "" // 예약 미사용 → tickets 섹션 아예 출력하지 않음
              : `
            <div class="membership-detail-popover__sub-tickets-wrap">
              <div class="membership-detail-popover__sub-content-title">예약 가능한 수업</div>
              ${ticketsHTML}
            </div>
          `
          }
        </div>
      </div>
    </aside>
  `;
}
