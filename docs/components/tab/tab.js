import "./tab.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-set").forEach((tabSet) => {
    /* ==========================
       Bg-tab (배경형 탭, <input type="radio"> 기반)
       ========================== */
    const bgInputs = tabSet.querySelectorAll(".bg-tab__input");
    const bgPanels = tabSet.querySelectorAll(".bg-tab__panel");

    if (bgInputs.length) {
      const updateBgTab = (input) => {
        const targetId = input.nextElementSibling.dataset.target; // 라벨 data-target

        bgPanels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.hidden = false;
            panel.classList.add("is-visible");

            // 템플릿 붙이기
            const tpl = document.getElementById(`tpl-${targetId}`);
            if (tpl) panel.innerHTML = tpl.innerHTML;

            // 탭 렌더링 완료 이벤트 발생
            const event = new CustomEvent("tab-updated", {
              detail: { targetId },
            });
            document.dispatchEvent(event);
          } else {
            panel.hidden = true;
            panel.classList.remove("is-visible");
          }
        });
      };

      // 초기 상태
      const checked = tabSet.querySelector(".bg-tab__input:checked");
      if (checked) updateBgTab(checked);

      // input 변경 시 갱신
      bgInputs.forEach((input) => {
        input.addEventListener("change", () => updateBgTab(input));
      });
    }

    /* ==========================
       Line-tab (라인형 탭, button 기반)
       ========================== */
    const lineTabs = tabSet.querySelectorAll(".line-tab__tab");
    const linePanels = tabSet.querySelectorAll(".line-tab__panel");

    if (lineTabs.length) {
      const updateLineTab = (tab) => {
        const targetId = tab.dataset.target;

        // 초기화
        lineTabs.forEach((t) => t.classList.remove("is-active"));
        linePanels.forEach((p) => {
          if (p.id === targetId) {
            p.hidden = false;
            p.classList.add("is-visible");

            // 템플릿 붙이기
            const tpl = document.getElementById(`tpl-${targetId}`);
            if (tpl) p.innerHTML = tpl.innerHTML;

            // 탭 렌더링 완료 이벤트 발생
            const event = new CustomEvent("tab-updated", {
              detail: { targetId },
            });
            document.dispatchEvent(event);
          } else {
            p.hidden = true;
            p.classList.remove("is-visible");
          }
        });

        tab.classList.add("is-active");
      };

      // 초기 상태
      const activeTab = tabSet.querySelector(".line-tab__tab.is-active");
      if (activeTab) updateLineTab(activeTab);

      // 탭 클릭 시 갱신
      lineTabs.forEach((tab) => {
        tab.addEventListener("click", () => updateLineTab(tab));
      });
    }
  });
});
