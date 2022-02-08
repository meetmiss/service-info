import Vue from 'vue'
import { Form, FormItem, Col, Row, Divider, Message, Tabs, TabPane, Input, Table, TableColumn, Select, Option, DatePicker, TimeSelect, TimePicker, Loading, Button, Pagination, MessageBox, Popconfirm, Upload, Notification, Dialog } from 'element-ui';
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Input);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Upload);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
