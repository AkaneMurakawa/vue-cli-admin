import Vue from 'vue'
import {
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Container,
    Header,
    Main,
    Aside,
    Row,
    Footer,
    Col,
    Input,
    Button,
    Form,
    FormItem,
    Loading,
    Select,
    Option,
    RadioButton,
    RadioGroup,
    Checkbox,
    Radio,
    Switch,
    CheckboxGroup,
    DatePicker,
    TimePicker,
    Avatar,
    Descriptions,
    DescriptionsItem,
    Tag,
    Table,
    TableColumn,
    Pagination,
    Tree,
    Dialog,
    Card,
    InputNumber,
} from 'element-ui';

// 按需引用
// 引入会自动弹出，this.$confirm是错的，需要改为MessageBox.confirm
// Vue.use(MessageBox)
// this.$confirm  ==>  MessageBox.confirm
// this.$message  ==>  Message

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Avatar)
Vue.use(Descriptions)
Vue.use(DescriptionsItem)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tree)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(InputNumber)