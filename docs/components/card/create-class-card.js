import "../checkbox/checkbox.js";
import { createCheckbox } from "../checkbox/create-checkbox.js";

/**
 * ClassCard 컴포넌트 생성 함수
 *
 * @param {Object} props - 수업 카드 렌더링에 필요한 데이터
 * @param {string} props.id - 카드 고유 ID
 * @param {string} props.folderName - 수업 폴더명 (예: "퍼스널 PT")
 * @param {string} props.className - 수업 이름 (예: "1:1 개인 PT")
 * @param {string} props.badge - 뱃지 텍스트 (예: "그룹", "개인")
 * @param {string} props.badgeVariant - 뱃지 스타일 키 (예: "group", "personal")
 * @param {string} props.duration - 수업 시간 (예: "50분")
 * @param {string} props.people - 수강 인원 (예: "10명")
 * @param {string} props.trainer - 담당 트레이너 이름
 * @param {boolean} [props.withCheckbox=false] - 체크박스 표시 여부
 * @param {boolean} [props.checked=false] - 체크박스 기본 선택 여부
 * @param {boolean} [props.popover=true] - 카드 클릭 시 팝오버 표시 여부
 *
 * @returns {string} - 생성된 수업 카드 HTML 문자열
 */
export function createClassCard({
  id,
  folderName,
  className,
  badge,
  badgeVariant,
  duration,
  people,
  trainer,
  withCheckbox = false,
  checked = false,
  popover = true,
}) {
  /**
   * 체크박스 영역
   * - withCheckbox 옵션이 true일 때만 표시
   * - 공통 createCheckbox() 유틸 사용
   */
  const checkboxHTML = withCheckbox
    ? `
      <div class="class-card__checkbox">
        ${createCheckbox({
          id: `class-card-checkbox-${id}`,
          size: "medium",
          variant: "ghost",
          label: "",
          checked,
        })}
      </div>
    `
    : "";

  /**
   * 최종 카드 구조
   * - data-* 속성에 주요 데이터를 저장 (팝오버 및 다른 로직에서 재사용)
   * - withCheckbox=true일 경우 "checkbox-mode" 클래스 추가
   * - data-popover로 팝오버 열림 여부 제어
   */
  return `
    <div class="class-card ${withCheckbox ? "checkbox-mode" : ""}"
         data-id="${id}"
         data-folder-name="${folderName}"
         data-class-name="${className}"
         data-badge="${badge}"
         data-badge-variant="${badgeVariant}"
         data-duration="${duration}"
         data-people="${people}"
         data-trainer="${trainer}"
         data-popover="${popover ? "true" : "false"}">
      ${checkboxHTML}
      <div class="class-card__content">
        <!-- 상단: 폴더명 + 수업명 -->
        <ul class="class-card__header">
          <li class="class-card__header__folder-name">${folderName}</li>
          <li class="class-card__header__class-name">${className}</li>
        </ul>
        <!-- 하단: 뱃지 + 세부 정보 -->
        <ul class="class-card__detail">
          <li class="class-card__badge class-card__badge--${badgeVariant}">${badge}</li>
          <li class="class-card__duration">${duration}</li>
          <li class="class-card__people">${people}</li>
          <li class="class-card__trainer">
             ${Array.isArray(trainer) ? trainer.join(", ") : trainer}
          </li>
        </ul>
      </div>
    </div>
  `;
}
