<?php require __DIR__ . '/db.php'; ?>
<?php require __DIR__ . '/header.php'; ?>

  <div class="container" id="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row flex-lg-nowrap">
          <div class="col mb-3">
            <div class="e-panel card">
              <div class="card-body">
                <div class="card-title">
                  <h6 class="mr-2"><span>Users</span></h6>
                    <div class = "row">
                      <div class="col-sm-6">
                        <button type="button" class="btn modalUser" data-toggle="modal" data-target="#user-form-modal">Add</button>
                      </div>
                      <div class="col-sm-5">
                        <select class="custom-select">
                          <option selected>Please Select</option>
                          <option value="1">Set active</option>
                          <option value="2">Set not active</option>
                          <option value="3">Delete</option>
                         </select>
                        </div>
                      <div class="col-sm-1">
                        <button type="button" class="btn btn-outline-success" id="list-button" >Ok</button>
                      </div>
                    </div>
                <div class="e-table">
                  <div class="table-responsive table-lg mt-3">
                    <table class="table table-bordered" id="table">
                      <thead>
                        <tr>
                          <th class="align-top">
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                              <input type="checkbox" class="custom-control-input" id="all-items">
                              <label class="custom-control-label" for="all-items"></label>
                            </div>
                          </th>
                          <th class="max-width">Name</th>
                          <th class="sortable">Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      <?php     
                      $sql = "SELECT * FROM users";
                      $arr = $dbConnect->fetchAll($sql);
                      $array = json_decode($arr, true);
                      if(isset($array))
                      $arrayCount = count($array);
                      if($arrayCount >= 1){
                      foreach ($array as $value) {
                        $for = 'for="item-' . $value['id'] . '"';
                      ?>
                        <tr data-rowId = '<?= $value['id'] ?>' id="uRow">
                          <td class="align-middle" >
                            <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="checklist">
                              <input type="hidden" class="form-control" id="list-action" name="list-action" value="true">
                                <input type="checkbox" name="az" class="custom-control-input" id="item-<?php echo $value['id']; ?>" value="<?php echo $value['id']; ?>">
                                <label class="custom-control-label" for="item-<?php echo $value['id']; ?>"></label>
                              </div>
                          </td>
                          <td class="username"><?= $value['first_name'] ?> <?= $value['last_name'] ?></td>
                          <td class="role">
                            <span> 
                              <?php  $role = $value['role'] == '1' ? 'User' : 'Admin';  echo $role; ?>
                            </span>
                          </td>
                          <td class="status">
                            <div style="text-align:center;">
                            <?php if($value['status'] == 1){ ?>
                            <i class="fa fa-circle active-circle"></i>
                            <?php }else{ ?>
                            <i class="fa fa-circle not-active-circle"></i>
                            <?php } ?>
                            </div>
                          </td>
                          <td class="button">
                            <div class="btn-group align-top text-center" >
                              <div class="badge">
                              <button class="btn modalUser" type="button" data-toggle="modal"
                                data-target="#user-form-modal" 
                                data-id="<?php echo $value['id']; ?>"
                                data-firstname="<?php echo $value['first_name']; ?>"
                                data-lastname="<?php echo $value['last_name']; ?>"
                                data-role="<?php echo $value['role']; ?>"
                                data-status="<?php echo $value['status']; ?>"
                                >Edit</button>
                                </div>
                                <div class="badge">
                              <button class="btn deleteUser" type="button" data-toggle="modal"
                                data-target="#delete-user-form-modal" 
                                data-firstname="<?php echo $value['first_name']; ?>"
                                data-lastname="<?php echo $value['last_name']; ?>"
                                data-id="<?php echo $value['id']; ?>"><i
                                  class="fa fa-trash"></i></button></div>
                            </div>
                          </td>
                        </tr>
                        <?php } ?>
                        <?php }else{ ?>
                        <div class="alert alert-warning" role="alert" id="user-not-found">
                          Users is not found!
                        </div>
                        <?php } ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- User Form Modal -->
        
        <div class="modal fade" id="user-form-modal" tabindex="-1" aria-labelledby="user-form-modal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div>
                <div id="result_form"></div>   
            </div>
            <div class="modal-header">
              <h5 class="modal-title" id="UserModalLabel">Add/Edit user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="post" id="ajax_form" action="" >
                <input type="hidden" class="form-control" name="u-id" id="u-id" value="">
                <div class="form-group">
                  <label for="first-name" class="col-form-label">First Name:</label>
                  <input type="text" class="form-control" id="first-name" name="first-name">
                </div>
                <div class="form-group">
                  <label for="last-name" class="col-form-label">Last Name:</label>
                  <input type="text" class="form-control" id="last-name" name="last-name">
                </div>
                <div class = "row">
                  <div class="col-sm-11">
                    <p>Status:</p>
                  </div>
                  <div class="col-sm">
                    <div class="material-toggle">
                <p><input type="checkbox" id="toggle" name="toggle" checked class="switch" />
                <label for="toggle" class=""></label></p>
              </div>
            </div>
          </div>
          <div class = "row">
            <div class="col-sm-8">
              <p>Role:</p>
            </div>
            <div class="col-sm">
              <select class="custom-select" id="list" name="roleSelect">
                <option id="role"  value="0">Please Select</option>
                <option id="role"  value="1">User</option>
                <option id="role"  value="2">Admin</option>
            </select>
            </div>
          </div>
          </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="btn">Save</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Delete User Form Modal -->
        <div class="modal fade" id="delete-user-form-modal" tabindex="-1" aria-labelledby="delete-user-form-modal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="UserModalLabel">Delete user </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="post" id="ajax_form_del" action="" >
                <input type="hidden" class="form-control" id="delAction" name="delAction" value="true">
                <input type="hidden" class="form-control" name="del-u-id" id="del-u-id" value="">
                <p id="UserModalLabelDel"></p>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="btnDel">Delete</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>      
    </div>
  </div>
</body>
</html>