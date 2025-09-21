# Luach Beit Knesset

This is a simple web application that displays various times and schedules for a Beit Knesset. It includes times for Shabbat, daily prayers, and important events. The application utilizes external APIs to fetch data.

## Files

- `index.html`: The main HTML file that contains the structure of the web page.
- `styles.css`: The CSS file that styles the web page.
- `script.js`: The JavaScript file that fetches and updates the times and schedules.

## External Resources

- Google Fonts for the Alef font.
- Bootstrap for styling.
- Hebcal API for fetching Jewish calendar times.


## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Weekly.json update

1. Get Yisrael PDF 
2. Copy-paste to TextEdit
3. Set UTF-8
4. Save file
5. Import to Excel new
6. Edit Sheet with spaces
7. Add loazi from calendar
8. Update empty cells
9. Edit convert_excel_json_python_#tashpav#.py
-- If Python is not installed (Mac)
1. Move to python enviroment
2. Install python, panda, openyxl
----------------------------------
10. python convert_excel_json_python_#tashpav#.py > #tashpav#.json
11. Append #tashpav#.json in weekly.com