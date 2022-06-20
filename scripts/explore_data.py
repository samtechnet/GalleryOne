import numpy as np
import pandas as pd 
import os, sys
from datetime import datetime

class Data_Preprocessing:

    def __init__(self, df : pd.DataFrame) -> None: 
        self.df = df

################################################################################################################
# Data Information Script
################################################################################################################
#/* err */
    def show_datatypes(self) -> pd.DataFrame:
        return self.df.dtypes

    def show_stats_info(self) -> pd.DataFrame:
        return self.df.agg(['mean'])
    
    def show_correlation(self) -> pd.DataFrame:
        return self.df.corr()
    
    def show_data_desc(self) -> pd.DataFrame:
        return self.df.describe()
    
    def preprocess_view_na(self) -> pd.DataFrame:
        return self.df.isna().sum()

################################################################################################################
# Data Cleaning Script
################################################################################################################

    def drop_duplicates(self) -> pd.DataFrame:
        old = self.df.shape[0]
        dropped = self.df[self.df.duplicated()].index
        self.df.drop(index = dropped, inplace = True)
        new = self.df.shape[0]
        count =  new - old
        if count == 0:
            print('There are no duplicates rows')
        else: 
            print(f'There are {count} numbers of duplicates')

    def convert_to_numbers(self) -> pd.DataFrame:
        self.df = self.df.apply(lambda x : pd.to_numeric(x, errors = 'coerce'))
        return self.df
    
    def replace_cateorical_data(self) -> pd.DataFrame: 
        self.df.replace({'Gender' : {'Male': 0, 'Female' : 1}, 
                        'Occupation Status' : {'Employed' :1, 'Self Employed' : 2, 'Unemployed' : 0}, 
                        'Marital_Status' : {'Married' : 1, 'Not Married' :0},
                        'Education' : {'Graduate' : 1, 'No Graduate' : 0}, 
                        'Current Loan' : {True : 1, False :0}, 
                        'Defaulted' : {True :1, False :0}}, inplace = True)
        return self.df
        
################################################################################################################
# Missing Data Manuipulation Script
################################################################################################################

    def percentage_missing_values(self) -> pd.DataFrame:
        missing_count = self.df.isna().sum()
        total_cell = np.product(self.df.shape)
        total_missing = missing_count.sum()
        print(f'The dataset contains {round(((total_missing / total_cell) * 100 ), 2)}% of missing values')

    def percentage_missing_rows(self) -> pd.DataFrame:
        missing_rows = sum([True for idx, rows in self.df.iterrows() if any(rows.isna())])
        total_rows = self.df.shape[0]
        print(f'The dataset has {round(((missing_rows / total_rows) * 100 ), 2)}% of missing values')

    def missing_values_table(self) ->pd.DataFrame:
        mis_val = self.df.isnull().sum()  # Total missing values
        mis_val_percent = 100 * mis_val / len(self.df) # Percentage of missing values
        mis_val_dtype = self.df.dtypes # dtype of missing values
        mis_val_table = pd.concat([mis_val, mis_val_percent, mis_val_dtype], axis=1) # Make a table with the results
        mis_val_table_ren_columns = mis_val_table.rename(
        columns = {0 : 'Missing Values', 1 : '% of Total Values', 2: 'Dtype'}) # Rename the columns
        mis_val_table_ren_columns = mis_val_table_ren_columns[
            mis_val_table_ren_columns.iloc[:,0] != 0].sort_values(
        '% of Total Values', ascending=False).round(2) # Sort the table by percentage of missing descending and remove columns with no missing values

        print ("Your selected dataframe has " + str(self.df.shape[1]) + " columns.\n"
            "There are " + str(mis_val_table_ren_columns.shape[0]) +
            " columns that have missing values.")

        if mis_val_table_ren_columns.shape[0] == 0:
            return

        return mis_val_table_ren_columns # Return the dataframe with missing information
        
    def fix_missing_ffill(self, col):
        count = self.df[col].isna().sum()
        self.df[col] = self.df[col].fillna(method='ffill')
        print(f"{count} missing values in the column {col} have been replaced using the forward fill method.")
        return self.df[col]


    def fix_missing_bfill(self, col):
        count = self.df[col].isna().sum()
        self.df[col] = self.df[col].fillna(method='bfill')
        print(f"{count} missing values in the column {col} have been replaced using the backward fill method.")
        return self.df[col]

    def fix_missing_median(self, col):
        median = self.df[col].median()
        count = self.df[col].isna().sum()
        self.df[col] = self.df[col].fillna(median)
        print(f"{count} missing values in the column {col} have been replaced by its median value {median}.")
        return self.df[col]

    def drop_cols(self) ->pd.DataFrame:
        old = self.df.shape[0]
        self.df.dropna(inplace = True)
        new = self.df.shape[0]
        tot = old - new
        print(f'{tot} rows containing missing values were dropped from our dataframe.')
        return self.df

################################################################################################################
# CretingTarget Variable
################################################################################################################

    def get_score(self) ->pd.DataFrame: 
        for index, row in self.df.iterrows():
            c1 = 0
            c2 = 0 
            c3 = 0 
            c4 = 0 
            c5 = 0 
            c6 = 0 
            c7 = 0
            c8 = 0
            c9 = 0
            score = 0

            if (row['Occupation Status'] == 1):
                c1 = 3
            elif (row['Occupation Status'] == 2): 
                c1 = 2
            c1 = 1

            if (row['Education'] == 1):
                c2 = 5
            c2 = 2

            if (row['Marital_Status'] == 1):
                c3 = 4
            c3 = 2 

            if (row['Dependants'] == 0):
                c4 = 5
            elif (row['Dependants'] == 1):
                c4 = 4
            elif (row['Dependants'] == 2):
                c4 = 3 
            c4 = 2

            if (row['Salary'] > 0):
                c5 = row['Salary'] / 10000
            
            if (row['State_Code'] == 5): 
                c6 = 5
            elif (row['State_Code'] == 4):
                c6 = 4
            elif (row['State_Code'] == 3): 
                c6 = 3
            c6 = 2 

            if (row['Current Loan'] == 1):
                c7 = 0
            elif ((row['Previous Loans'] ==1) and (row['Defaulted'] == 1)):
                c7 = 0
            elif ((row['Previous Loans'] > 0) and (row['Defaulted'] == 0)):
                c7 = 5
            c7 = 3
            
            c8 = c1+c2+c3+c4
            c9 = c5*c6*c7
            score = c8*c9

            self.df.loc[[index], 'newscore'] = score

        return self.df


    def get_target_data(self) -> pd.DataFrame: 
        self.df['Status'] = self.df['newscore'].apply(lambda x: 1 if x > 500 else 0)
        return self.df
