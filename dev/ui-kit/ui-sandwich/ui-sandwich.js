const sandwichToggle = () => {
    const sandwichElements = document.querySelectorAll('.sandwich');
    sandwichElements.forEach(item => {
        item.addEventListener('click', showSandwichTarget);
    });
    function showSandwichTarget() {
        let targetId = this.getAttribute('data-target-id'),
            targetClassToggle = this.getAttribute('data-target-class-toggle');
        this.classList.toggle('is-active');
        if (targetId && targetClassToggle) {
            document.getElementById(targetId).classList.toggle(targetClassToggle);
        }
    }
};
sandwichToggle();
