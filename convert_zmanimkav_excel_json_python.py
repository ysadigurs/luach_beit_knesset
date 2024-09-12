import pandas
import json

# Read excel document
excel_data_df = pandas.read_excel('zmanim_kavua.xlsx', sheet_name='xxx', engine='openpyxl')

for column in excel_data_df.columns:
    if pandas.api.types.is_datetime64_any_dtype(excel_data_df[column]):
        excel_data_df[column] = excel_data_df[column].dt.strftime('%d-%m-%Y')  # or another format


# Convert excel to string 
# (define orientation of document in this case from up to down)
thisisjson = excel_data_df.to_json(orient='records', force_ascii=False)

# Print out the result
print('Excel Sheet to JSON:\n', thisisjson)

# Make the string into a list to be able to input in to a JSON-file
thisisjson_dict = json.loads(thisisjson)

# Define file to write to and 'w' for write option -> json.dump() 
# defining the list to write from and file to write to
with open('data_zmanim_kavua.json', 'w') as json_file:
    json.dump(thisisjson_dict, json_file, ensure_ascii=False)
