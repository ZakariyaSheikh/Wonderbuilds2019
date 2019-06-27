export default function getFileName(url = '') {
    const m = url.toString().match(/.*\/(.+?)\./);
    return m ? m[1] : '';
}
