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

namespace ChatApp.ViewModel
{
    public class MainViewModel : ViewModelBase
    {
        private String phone;
        private String password;
        private ICommand _loginCommand { get; set; }
        public MainViewModel()
        {
        }

        public String Phone
        {
            get { return phone; }
            set
            {
                phone = value;
                RaisePropertyChanged("Phone");
                Console.WriteLine("Hello");
            }
        }
        public String Password { get; set; }

        public ICommand LoginCommand { get; set; }
    }
}
