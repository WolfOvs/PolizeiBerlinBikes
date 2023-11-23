export const formatDate = (date: number) => {
    const newDate = new Date(date);

    return newDate.toString();
}