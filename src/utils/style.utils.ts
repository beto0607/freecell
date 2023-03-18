export const classes = (...classList: string[]): string => {
    if (!classList?.length) {
        return '';
    }
    return classList.join(' ');
}
