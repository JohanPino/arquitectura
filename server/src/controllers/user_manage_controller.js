const userController = {};
const resources_controller = require('../resources/resources_controller');
const connection = require('../database/connection');


userController.getUsers = async (req, res) => {
    try {
        let query = {
            text: `SELECT * FROM f_get_users()`
        };
        await connection.connect(async (err, client, done) => {
            try {
                if (err) {
                    res.json(resources_controller.leerRecurso(1011, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (err) {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1011, err.message));
                        } else {

                            res.status(200).json(results.rows);

                        }
                    });
                }
            } finally {
                done();
                query = {};
            }
        });

    } catch (error) {
        res.json(resources_controller.leerRecurso(1011, error.message));
    }
}

userController.createUser = async (req, res) => {
    try {
        console.log(req.body)
        if (resources_controller.validarIdentification(req.body.identification)) {
            await connection.connect(async (err, client, done) => {
                try {
                    let queryValidarUsuario = {
                        text: "select * from f_validate_insert_user($1,$2)",
                        values: [req.body.identification, req.body.email]
                    };
                    if (err) {
                        res.json(resources_controller.leerRecurso(1003, err.message));
                    } else {
                        await client.query(queryValidarUsuario, async (err, results) => {
                            if (!err) {
                                const estadoUsuario = results.rows[0].f_validate_insert_user;
                                if (estadoUsuario === resources_controller.ESTADO_USUARIO.IDENTIFICATION_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1004));
                                } else if (estadoUsuario === resources_controller.ESTADO_USUARIO.EMAIL_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1012));
                                } else {
                                    query = {
                                        text: "select * from f_insert_user($1)",
                                        values: [req.body]
                                    };
                                    client.query(query, async (err, results) => {
                                        if (!err) {
                                            res.json(resources_controller.leerRecurso(1002));

                                        } else {
                                            await client.query("ROLLBACK");
                                            res.json(resources_controller.leerRecurso(1003, err.message));
                                            console.log(err)
                                        }
                                    });
                                }
                            } else {
                                await client.query("ROLLBACK");
                                res.json(resources_controller.leerRecurso(1003, err.message));
                                console.log(err)
                            }
                        });
                    }
                } finally {
                    done();
                    queryValidarUsuario = {}
                }
            });
        } else {
            res.json(resources_controller.leerRecurso(1013));
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1003, error.message));
        console.log(error)
    }
}

userController.updateUser = async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
        if (resources_controller.validarIdentification(req.body.identification)) {
            await connection.connect(async (err, client, done) => {
                try {
                    let queryValidarUsuario = {
                        text: "select * from f_validate_update_user($1,$2,$3)",
                        values: [req.body.identification, req.body.email, req.params.id]
                    };
                    if (err) {
                        res.json(resources_controller.leerRecurso(1018, err.message));
                    } else {
                        await client.query(queryValidarUsuario, async (err, results) => {
                            if (!err) {
                                const estadoUsuario = results.rows[0].f_validate_update_user;
                                if (estadoUsuario === resources_controller.ESTADO_USUARIO.IDENTIFICATION_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1004));
                                } else if (estadoUsuario === resources_controller.ESTADO_USUARIO.EMAIL_EXISTE) {
                                    res.json(resources_controller.leerRecurso(1012));
                                } else {
                                    query = {
                                        text: "select * from f_update_user($1,$2)",
                                        values: [req.body, req.params.id]
                                    };
                                    client.query(query, async (err, results) => {
                                        if (!err) {
                                            res.json(resources_controller.leerRecurso(1019));

                                        } else {
                                            await client.query("ROLLBACK");
                                            res.json(resources_controller.leerRecurso(1018, err.message));
                                            console.log(err)
                                        }
                                    });
                                }
                            } else {
                                await client.query("ROLLBACK");
                                res.json(resources_controller.leerRecurso(1018, err.message));
                                console.log(err)
                            }
                        });
                    }
                } finally {
                    done();
                    queryValidarUsuario = {}
                }
            });
        } else {
            res.json(resources_controller.leerRecurso(1013));
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1018, error.message));
        console.log(error)
    }
}

userController.enableUser = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_enable_user($1)",
                    values: [req.params.id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1023, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1021));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1023, err.message));
                        }
                    });
                }
            } finally {
                done();
                query = {}
            }
        });
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1023, error.message));
    }
}

userController.disableUser = async (req, res) => {
    try {
        console.log(req.params.id)
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_disable_user($1)",
                    values: [req.params.id]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1022, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1020));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1022, err.message));
                        }
                    });
                }
            } finally {
                done();
                query = {}
            }
        });
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1022, error.message));
    }
}

userController.updatePassword = async (req, res) => {
    try {
        await connection.connect(async (err, client, done) => {
            try {
                let query = {
                    text: "select * from f_update_user_password($1, $2)",
                    values: [req.params.id, req.body.password]
                };
                if (err) {
                    res.json(resources_controller.leerRecurso(1024, err.message));
                } else {
                    await client.query(query, async (err, results) => {
                        if (!err) {
                            res.json(resources_controller.leerRecurso(1025));
                        } else {
                            await client.query("ROLLBACK");
                            res.json(resources_controller.leerRecurso(1024, err.message));
                        }
                    });
                }
            } finally {
                done();
                query = {}
            }
        });
    } catch (error) {
        await client.query("ROLLBACK");
        res.json(resources_controller.leerRecurso(1024, error.message));
    }
}

module.exports = userController;