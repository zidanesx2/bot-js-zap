
        @echo off
        yt-dlp -f bestaudio --extract-audio --audio-format mp3 --output "downloads/%(title)s.%(ext)s" https://youtube.com/watch?v=tERTBPdVivc
      