using System;
using System.Windows;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Views;
using GalaSoft.MvvmLight.Messaging;
using GalaSoft.MvvmLight.Threading;
using ChatApp.Model;
using System.Windows.Input;
using Windows.UI.Popups;
using Windows.UI.Xaml.Controls;

namespace ChatApp.ViewModel
{
    public class MainViewModel : ViewModelBase
    {
        private String phone;
        private String password;
        public ICommand LoginCommand { get; set; }
        public ICommand ShowRegisterCommand { get; set; }
        private readonly INavigationService navigationService;
        public MainViewModel(INavigationService navService)
        {
            navigationService = navService;
            LoginCommand = new RelayCommand(LoginCommandAction);
            ShowRegisterCommand = new RelayCommand(ShowRegisterAction);
        }

        private void ShowRegisterAction()
        {
            navigationService.NavigateTo("Register");
        }

        public String Phone
        {
            get { return phone; }
            set
            {
                phone = value;
                RaisePropertyChanged("Phone");
            }
        }
        public String Password
        {
            get { return password; }
            set
            {
                password = value;
                RaisePropertyChanged("Password");
            }
        }

        private async void LoginCommandAction()
        {
            if (String.IsNullOrEmpty(phone) && String.IsNullOrEmpty(password))
            {
                MessageDialog showDialog = new MessageDialog("Password and phone fields cannot be left blank. You must enter a phone and password.", "Error");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
            }
            else if (phone == null || String.IsNullOrEmpty(phone) || String.IsNullOrWhiteSpace(phone))
            {
                MessageDialog showDialog = new MessageDialog("You must enter a phone number.", "Error");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
            }
            else if (password == null || String.IsNullOrEmpty(password) || String.IsNullOrWhiteSpace(password))
            {
                MessageDialog showDialog = new MessageDialog("You must enter a password.", "Error");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
            }
            else
            {
                MessageDialog showDialog = new MessageDialog($"Your number is: {phone}\nYour password is: {password}", "Success");
                showDialog.Commands.Add(new UICommand("Ok") { Id = 0 });
                showDialog.CancelCommandIndex = 0;
                await showDialog.ShowAsync();
                phone = null;
                password = null;
                RaisePropertyChanged("Phone");
                RaisePropertyChanged("Password");
            }
        }
    }
}
