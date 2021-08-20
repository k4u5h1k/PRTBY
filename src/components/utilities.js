var format_size = (num, suffix='B') => {
    var sizes = ['','Ki','Mi','Gi','Ti','Pi','Ei','Zi']
    for (const unit in sizes){
        if (Math.abs(num) < 1024.0) return `${(num).toFixed(2)} ${sizes[unit]}${suffix}`
        num /= 1024.0
    }
    return `${(num).toFixed(2)} Yi${suffix}`
}

var generateMeta = (el) => {
    var name = el['username']
    var size = format_size(Number(el['size']))
    var date = new Date(el['added']*1000).toLocaleString()
    return `${name} | ${size} | seeders: ${el['seeders']} leechers: ${el['leechers']} | ${date}`
}

var get_trackers = () => {
    let tr = '&tr=' + encodeURIComponent('udp://tracker.coppersurfer.tk:6969/announce');
    tr += '&tr=' + encodeURIComponent('udp://tracker.openbittorrent.com:6969/announce');
    tr += '&tr=' + encodeURIComponent('udp://tracker.opentrackr.org:1337');
    tr += '&tr=' + encodeURIComponent('udp://tracker.leechers-paradise.org:6969/announce');
    tr += '&tr=' + encodeURIComponent('udp://tracker.dler.org:6969/announce');
    tr += '&tr=' + encodeURIComponent('udp://opentracker.i2p.rocks:6969/announce');
    tr += '&tr=' + encodeURIComponent('udp://47.ip-51-68-199.eu:6969/announce');
    return tr;
}

var copyToClipboard = (magnet) => {
    var textField = document.createElement('textarea')
    textField.innerText = magnet
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
}

var copyOrDownload = (el) => {
    var magnet = generateMagnet(el['info_hash'], el['name']);
    var choice = window.confirm("Click 'Cancel' to copy torrent magnet, 'OK' to open torrent in client.")
    if(choice === true) {
        window.open(magnet)
    }
    else {
        copyToClipboard(magnet)
        alert('Copied to clipboard')
    }
}

var generateMagnet = (ih, name) =>{
    return `magnet:?xt=urn:btih:${ih}&dn=${encodeURIComponent(name)}${get_trackers()}`
}

export {generateMeta, format_size, copyOrDownload}
