import uuid
import random
# import datetime
import numpy as np
import pandas as pd

num_users = 100000
features = ['ID','Gender','Occupation_Status','Age','State','Salary','debt_to_debt',
    'Current_Loan','Tenure','Previous_Loans','Defaulted','Default_Dur']
df = pd.DataFrame(columns = features)

class Create_Dataset: 
    """
    This function would create the dataset
    """

    def __init__(self, df : pd.DataFrame): 
        self.df = df
        print('Creating DataFrame...!!!')
    
    def create_unique_id(self) -> pd.DataFrame: 
        self.df['ID'] = [uuid.uuid4().hex for i in range(num_users)]
        return self.df
    
    def create_gender(self) -> pd.DataFrame:
        genders = ["male", "female", "na"]
        self.df['Gender'] =  random.choices(
            genders, weights=(70,24,5), k=num_users)
        return self.df
    
    def create_occupation(self) -> pd.DataFrame:
        occupation = ['Employed', 'Self Employed', 'Unemployed']
        self.df['Occupation Status'] = random.choices(
            occupation, weights=(35, 55, 10), k=num_users)
        return self.df

    def create_age(self) -> pd.DataFrame:
        np.random.seed(42)
        def age_range(gender):
            """
            Generates a age based on gender
            """
            if gender=='male':
                return np.random.randint(19, 50)
            elif gender=='female':
                return np.random.randint(25, 40)
            return np.random.randint(19, 50)
        # Generating names for each user
        self.df['Age'] = [age_range(i) for i in self.df['Gender']]
        return self.df
    
    def create_state(self) -> pd.DataFrame:
        states = ['Abia', 'Abuja', 'Akwa Ibom', 'Bauchi', 'Bayelsa', 'Cross River', 'Delta','Edo','Ekiti',
                'Enugu', 'Imo','Kaduna','Kano','Kogi','Kwara','Lagos','Ogun','Ondo','Osun',
                'Oyo','Port Harcourt','Sokoto']

        self.df['State'] = random.choices(
            states,
            weights = (10,30,4,1,3,12,6,2,10,7,7,12,15,5,8,60,10,7,8,14,20,2),
            k = num_users
        )
        return self.df

    def create_debt_to_debt_ratio(self) -> pd.DataFrame:
        def d2d_ratio(state):
            if (state == 'Abuja') | (state == 'Lagos') | (state == 'Port Harcourt'):
                return 5
            elif (state == 'Kano') | (state == 'Kwara') | (state == 'Oyo') | (state == 'Ogun') | (state == 'Cross River' )| (state == 'Imo'):
                return 4
            elif (state == 'Kaduna') | (state == 'Kogi') | (state == 'Abia') | (state ==  'Enugu') | (state == 'Osun' )| (state == 'Edo'):
                return 3
            return 2
        
        self.df['debt_to_debt'] = [d2d_ratio(i) for i in self.df['State']]
        return self.df
    def create_tenure(self) -> pd.DataFrame:
        np.random.seed(3)
        def ten(period):
            if period == True:
                return np.random.randint(1, 5)
            return 0
        self.df['Tenure'] = [ten(i) for i in self.df['Current Loan']]
        return self.df

    def create_current_loan(self) -> pd.DataFrame: 
        choice = [True, False]
        self.df['Current Loan'] = random.choices(
            choice, weights = (30, 70),k=num_users)
        return self.df

    def create_previous_loans(self) -> pd.DataFrame:
        return ...

    def create_salary(self) -> pd.DataFrame: 
        return ... 
    def create_defaulted(self) -> pd.DataFrame: 
        return ... 
    def create_defaulted_rat(self) -> pd.DataFrame: 
        return ... 
    
    def create_data(self, save = False) -> pd.DataFrame:
        """Required columns to be created"""
        features = ['ID','Gender','Occupation_Status','Age','State','Salary','debt_to_debt',\
                    'Current_Loan','Tenure','Previous_Loans','Defaulted','Default_Dur']

        self.df['ID'] = self.create_unique_id()
        self.df['Gender'] = self.create_gender()
        self.df['Occupation_Status'] = self.create_occupation()
        self.df['Age'] = self.create_age()
        self.df['State'] = self.create_state()
        self.df['debt_to_debt'] = self.create_debt_to_debt_ratio()
        self.df['Current_Loan'] = self.create_current_loan()
        self.df['Tenure'] = self.create_tenure()
        self.df['Previous_Loans'] = self.create_previous_loans()
        self.df['Salary'] = self.create_salary()
        self.df['Defaulted'] = self.create_defaulted()
        self.df['Default_Dur'] = self.create_defaulted_rat()
        
        data = zip(self.df['ID'],self.df['Gender'],self.df['Occupation_Status'],self.df['Age'],self.df['State'],self.df['Salary'],self.df['debt_to_debt'],
            self.df['Current_Loan'],self.df['Tenure'],self.df['Previous_Loans'],self.df['Defaulted'],self.df['Default_Dur'])
        self.df = pd.DataFrame(data = data, columns=features)
        if save:
            self.df.to_csv('../data/auction_data.csv', index=False)
            print('File Successfully Saved.!!!')
        return self.df

if __name__ == "__main__":
    """Required columns to be created"""
    features = ['ID','Gender','Occupation_Status','Age','State','Salary','debt_to_debt',
        'Current_Loan','Tenure','Previous_Loans','Defaulted','Default_Dur']
    # df = pd.read_csv("/home/codeally/project/Twitter-Data-Analysis/data/processed_tweet_data.csv") 
    cleaner = Create_Dataset(df)
    cleaner.create_data(True)
    # def create_previous_loans(self) -> pd.DataFrame: 