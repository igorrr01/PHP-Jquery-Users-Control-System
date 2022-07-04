<?php require __DIR__ . '/db.php'; ?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Users table</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.bundle.min.js"></script>
  <script src="js.js?<?php echo rand(1111,999999); ?>"></script>
</head>
<body>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <div class="container">
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row flex-lg-nowrap">
          <div class="col mb-3">
            <div class="e-panel card">
              <div class="card-body">
                <div class="card-title">
                  <h6 class="mr-2"><span>Users</span></h6>
                  <div class="col-sm-6">
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#user-form-modal">Add</button>
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
                        <tr data-rowId = '<?= $value['id'] ?>'>
                          <td class="align-middle" >
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top" id="check">
                              <input type="checkbox" class="custom-control-input" id="item-1">
                              <label class="custom-control-label" for="item-1"></label>
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
                          <td class="text-center align-middle">
                            <div class="btn-group align-top">
                              <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal"
                                data-target="#user-form-modal" 
                                data-id="<?php echo $value['id']; ?>"
                                data-firstname="<?php echo $value['first_name']; ?>"
                                data-lastname="<?php echo $value['last_name']; ?>"
                                data-role="<?php echo $value['role']; ?>"
                                data-status="<?php echo $value['status']; ?>"
                                >Edit</button>
                              <button class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal"
                                data-target="#delete-user-form-modal" 
                                data-firstname="<?php echo $value['first_name']; ?>"
                                data-lastname="<?php echo $value['last_name']; ?>"
                                data-id="<?php echo $value['id']; ?>"><i
                                  class="fa fa-trash"></i></button>
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
              <h5 class="modal-title" id="UserModalLabel">Add user</h5>
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