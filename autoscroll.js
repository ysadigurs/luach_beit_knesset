
const scrollableColumn = document.getElementById('scrollable-column');
let scrollTop = 0;

function autoScroll() {
    const maxScrollTop = scrollableColumn.scrollHeight - scrollableColumn.clientHeight;

    scrollTop += 1; // Scroll down by 1px per interval

    if (scrollTop > maxScrollTop) {
            scrollTop = 0; // Reset scroll position to top
    }
    scrollableColumn.scrollTo(0, scrollTop);

}
