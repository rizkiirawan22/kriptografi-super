function enkripsi() {
    // Caesar Cipher
    var input = document.getElementById('plaintext').value,
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    key = Number(document.getElementById('caesarKey').value),
    shift = 3,
    caesarCipher = function (message, shift) {
        var output = '';

        message = message.toUpperCase();

        while (shift < 0) {
            shift += 26;
        }

        for (var i in message) {
            var c = message[i],
                index = alpha.indexOf(c);

            if (index >= 0) {
                var shiftLetter = alpha[(index + shift) % 26];
                output += shiftLetter;
            } else {
                output += c;
            }
        }
        return output;
    }
    caesar = caesarCipher(input, key);
    
    // Columnar Cipher
    var chars = "abcdefghijklmnopqrstuvwxyz";

    var key = normalize(getById("columnarKey").value);
    columnar = Encrypt(caesar, key);

    function Encrypt(plaintext, key) {
        var klen = key.length;
        var colLength = plaintext.length / klen;
        var ciphertext = "";
        k = 0;
        for (i = 0; i < klen; i++) {
            while (k < 26) {
                t = key.indexOf(chars.charAt(k));
                arrkw = key.split("");
                arrkw[t] = "_";
                key = arrkw.join("");
                if (t >= 0) break;
                else k++;
            }
            for (j = 0; j < colLength; j++) {
                ciphertext += plaintext.charAt(j * klen + t);
            }
        }
        return ciphertext;
    }

    function getById(id) {
        return document.getElementById(id);
    }

    function normalize(value) {
        return value.toLowerCase().replace(/[^a-z]/g, "");
    }

    // Rail Fence Cipher
    var key = document.getElementById("railKey").value;
    document.getElementById('cipher').innerHTML = RailFenceEncrypt(columnar, key)

    function RailFenceEncrypt(pesan, kunci) {
        plaintext = pesan.toLowerCase().replace(/[^a-z]/g, "");
        var key = parseInt(kunci);
        ciphertext = "";
        for (line = 0; line < key - 1; line++) {
          skip = 2 * (key - line - 1);
            j = 0;
            for (i = line; i < plaintext.length; ) {
                ciphertext += plaintext.charAt(i);
                if (line == 0 || j % 2 == 0) i += skip;
                else i += 2 * (key - 1) - skip;
                j++;
            }
            }
            for (i = line; i < plaintext.length; i += 2 * (key - 1))
            ciphertext += plaintext.charAt(i);
            return ciphertext;
    }    
}

function dekripsi(){
        // Rail Fance Cipher
        var input = document.getElementById("cipher").value;
        var key = document.getElementById("railKey").value;
        rail = RailFenceDecrypt(input,key);
        function RailFenceDecrypt(pesan, kunci) {
            cipher = pesan.toLowerCase().replace(/[^a-z]/g, "");
            var key = parseInt(kunci);
            pt = new Array(cipher.length);
            k = 0;
            for (line = 0; line < key - 1; line++) {
              skip = 2 * (key - line - 1);
                j = 0;
                for (i = line; i < cipher.length; ) {
                pt[i] = cipher.charAt(k++);
                if (line == 0 || j % 2 == 0) i += skip;
                else i += 2 * (key - 1) - skip;
                j++;
                }
            }
            for (i = line; i < cipher.length; i += 2 * (key - 1))
                pt[i] = cipher.charAt(k++);
            return pt.join("");
            }

        // Columnar Cipher
        var chars = "abcdefghijklmnopqrstuvwxyz";
        var key = normalize(getById("columnarKey").value);
        columnar = Decrypt(rail, key);

        function Decrypt(ciphertext, keyword) {
            var klen = keyword.length;
            // first we put the text into columns based on keyword length
            var cols = new Array(klen);
            var colLength = ciphertext.length / klen;
            for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
            // now we rearrange the columns so that they are in their unscrambled state
            var newcols = new Array(klen);
            j = 0;
            i = 0;
            while (j < klen) {
                t = keyword.indexOf(chars.charAt(i));
                if (t >= 0) {
                    newcols[t] = cols[j++];
                    arrkw = keyword.split("");
                    arrkw[t] = "_";
                    keyword = arrkw.join("");
                } else i++;
            }
            // now read off the columns row-wise
            var plaintext = "";
            for (i = 0; i < colLength; i++) {
                for (j = 0; j < klen; j++) {
                    plaintext += newcols[j].charAt(i);
                }
            }
            return plaintext;
        }

        function validate(text, message) {
            if (text.length < 1) {
                alert(message);
            }
        }

        function getById(id) {
            return document.getElementById(id);
        }

        function normalize(value) {
            return value.toLowerCase().replace(/[^a-z]/g, "");
        }

        // Caesar Cipher
        var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        key = Number(document.getElementById('caesarKey').value),
        shift = 3,
        caesarCipher = function (message, shift) {
            var output = '';
    
            message = message.toUpperCase();
    
            while (shift > 0) {
                shift -= 26;
            }
    
            for (var i in message) {
                var c = message[i],
                    index = alpha.indexOf(c);
    
                if (index >= 0) {
                    var shiftLetter = alpha[(index - shift) % 26];
                    output += shiftLetter;
                } else {
                    output += c;
                }
            }
            return output;
        }
        document.getElementById('plaintext').innerHTML = caesarCipher(columnar, key);

    }
function eraseText(){
    document.getElementById('cipher').value = "untuk deskripsi isi bagian ini";
    document.getElementById('plaintext').value = "untuk enkripsi isi bagian ini";
    document.getElementById('caesarKey').value = "";
    document.getElementById('columnarKey').value = "";
    document.getElementById('railKey').value = "";
}