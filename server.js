// import bcrypt from 'bcrypt';
const express = require('express'); // import express from express package
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {db} = require('./config/db.js');
const {SECRET_KEY} = require('./config/config');
const {CHAT_ID} = require('./config/config');
const {
        bot,
        sendNotification
    } = require('./telegramBot');

// ~~~
// const authRouter = require('./routes/authRouter');
// const users_router = require('./routes/rss.js');
// ~~~

const app = express(); // create app
app.use(cors());
app.use(express.json()); // func use - to parse JSON (server parse JSON from req)

// ~~~
// app.use('/auth', authRouter);
// app.use(authRouter.router);
// ~~~

dotenv.config();

// app.get("/test",async (req,res)=>{
//      await db.select().from('grade') 
//         .then((grades) => {
//             // console.log(grades, data);
//             console.log(grades)
//             // data.grades = grades; 
//             // res.json(data); 
//             res.json(grades)
//         })
//         .catch((error) => {
//             console.log("Error getting data: ", error);
//             res.status(500).json({error: "Error getting data"});
//         });
// })

const saltRounds = 10;
const verifyPassword = (password, hashedPassword) => { // func for checking password
    // console.log('Password test: ', password, hashedPassword);
    return hashedPassword
};

app.post('/api/login', (req, res) => { // handle for auth and create JWT
    const {username, password} = req.body;
 
    db.select().from('specialist')
        .where('username', username)
        .first()
        .then((user) => {
        if (user && verifyPassword(password,
                                    user.password)
                                    && user.status === 'active') {
            const token = jwt.sign({username: user.username,
                                    group: user.group_id},
                                    SECRET_KEY,
                                    {expiresIn: '1h'});
//~~~
            // localStorage.setItem('specialist_id', user.specialist_id); // save specialist_id in ls
            // req.specialist_id = user.specialist_id;
            // req.specialistData = user;
//~~~
            res.json({
                    success: true,
                    token,
                    group_id: user.group_id,
                    specialist_id: user.specialist_id
                });
        } else {
            res.status(401).json({success: false,
                                message: 'Wrong login or password'});
        }
        })
    .catch((error) => {
      console.log('Error getting user data:', error);
      res.status(500).json({success: false,
                            message: 'Server error'});
    });
});

app.get('/api/protected', (req, res) => { // protected routh after success auth
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({success: false,
                                    message: 'Missing authorization token'});
    }

    jwt.verify(token,
                SECRET_KEY,
                (err, decoded) => {
    if (err) {
        return res.status(401).json({success: false,
                                    message: 'Invalid authorization token'});
        }

    db.select().from('specialist')
        .where('username', decoded.username)
        .first()
        .then((user) => {
            if (user) {
            console.log('User data:', user);
            res.json({success: true,
                    message: 'Access'});
            } else {
            res.status(404).json({success: false,
                                message: 'User not found'});
            }
        })
        .catch((error) => {
            console.log('Error getting user data:', error);
            res.status(500).json({success: false,
                                message: 'Server Error'});
        });
    });
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'Hello, this is Scriptum'
    };
    res.json(data)
    console.log(data);
})

app.get("/api/getAllData", async (req, res) => { // all operations with DB - allways async
  const data = 
    {
        cashs: [],
        categories: [],
        companies: [],
        departments: [],
        grades: [],
        groups: [],
        hours: [],
        projects: [],
        project_departments: [],
        project_specialists: [],
        specialists: [],
        sprints: [],
        sprint_specialists: [],
        works: [],
    };
//   res.json(data);
    await db.select().from('grade') 
        .then((grades) => {
            // console.log(grades, data);
            data.grades = grades; 
            // res.json(data); 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting grades"});
        });

    await db.select().from('department') 
        .then((departments) => {
            // console.log(department, data);
            data.departments = departments; 
            // res.json(data); 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting departments"});
        });

    await db.select().from('group_data') 
        .then((groups) => {
            // console.log(group_data, data);
            data.groups = groups; 
            // res.json(data); 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting groups"});
        });

        await db.select().from('specialist') 
        .then((specialists) => {
            data.specialists = specialists; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting specialists"});
        });

        await db.select().from('category') 
        .then((categories) => {
            data.categories = categories; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting categories"});
        });

        await db.select().from('company') 
        .then((companies) => {
            data.companies = companies; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting companies"});
        });

        await db.select().from('project') 
        .then((projects) => {
            data.projects = projects; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting projects"});
        });

        await db.select().from('sprint') 
        .then((sprints) => {
            data.sprints = sprints; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting sprints"});
        });

        await db.select().from('work') 
        .then((works) => {
            data.works = works; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting works"});
        });

        await db.select().from('cash') 
        .then((cashs) => {
            data.cashs = cashs; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting cash"});
        });

        await db.select().from('hour') 
        .then((hours) => {
            data.hours = hours; 
        })
        .catch((error) => {
            console.log("Error getting data: ", error);
            res.status(500).json({error: "Error getting hours"});
        });

        res.json(data)
});

app.post('/api/saveGrade', (req, res) => {
    // grade.push(req.body);
    // res.send(grade);
    // res.status(201).json(grade)
    const {grade_type, cost} = req.body;
    
    db('grade')
    .insert({grade_type, cost})
    .then(() => {
        console.log('Grade saved successfully');
        res.status(201).json({message: 'Grade saved successfully'});
    })
    .catch(error => {
        console.log('Error saving grade: ', error);
        res.status(500).json({error: 'Error saving grade'});
    });
})

app.post('/api/saveDepartment', (req, res) => {
    const {d_name} = req.body;
    
    db('department')
    .insert({d_name})
    .then(() => {
        console.log('Department saved successfully');
        res.status(201).json({message: 'Department saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Department: ', error);
        res.status(500).json({error: 'Error saving Department'});
    });
})

app.post('/api/saveGroupData', (req, res) => {
    const {group_name} = req.body;
    
    db('group_data')
    .insert({group_name})
    .then(() => {
        console.log('Group saved successfully');
        res.status(201).json({message: 'Group saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Group: ', error);
        res.status(500).json({error: 'Error saving Group'});
    });
})

app.post('/api/saveCash', (req, res) => {
    const {cash} = req.body;
    
    db('cash')
    .insert({cash})
    .then(() => {
        console.log('Cash saved successfully');
        res.status(201).json({message: 'Cash saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Cash: ', error);
        res.status(500).json({error: 'Error saving Cash'});
    });
})

app.post('/api/saveHour', (req, res) => {
    const {hour, grade} = req.body;
    
    db('hour')
    .insert({hour, grade_id: grade})
    .then(() => {
        console.log('Hour saved successfully');
        res.status(201).json({message: 'Hour saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Hour: ', error);
        res.status(500).json({error: 'Error saving Hour'});
    });
})

app.post('/api/saveCategory', (req, res) => {
    const {name} = req.body;
    
    db('category')
    .insert({name})
    .then(() => {
        console.log('Category saved successfully');
        res.status(201).json({message: 'Category saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Category: ', error);
        res.status(500).json({error: 'Error saving Category'});
    });
})

app.post('/api/saveSpecialist', (req, res) => {
    const {
        username,
        f_name,
        l_name,
        email,
        password,
        grade,
        department,
        group,
        status
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    db('specialist')
    .insert({username,
            f_name,
            l_name,
            email,
            password: hashedPassword,
            grade_id: grade,
            department_id: department,
            group_id: group,
            status})
    .then(() => {
        console.log('Specialist saved successfully');
        res.status(201).json({message: 'Specialist saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Specialist: ', error);
        res.status(500).json({error: 'Error saving Specialist'});
    });
})

app.post('/api/saveCompany', (req, res) => {
    const {
        name, 
        address, 
        email, 
        phone, 
        contact_name, 
        web_site, 
        deposit, 
        category, 
        description
    } = req.body;
    
    db('company')
    .insert({name, 
            address, 
            email, 
            phone, 
            contact_name, 
            web_site, 
            deposit, 
            category_id: category, 
            description})
    .then(() => {
        console.log('Company saved successfully');
        res.status(201).json({message: 'Company saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Company: ', error);
        res.status(500).json({error: 'Error saving Company'});
    });
})

app.post('/api/saveProject', (req, res) => {
    const {
        name,
        company,
        s_date,
        e_date,
        deposit,
        description,
        specialist,
        department
    } = req.body;
    
    db.transaction((trx) => {
        trx('project')
            .insert({name,
                    company_id: company,
                    s_date,
                    e_date,
                    deposit,
                    description})
            .returning('project_id')
            .then((projectIds) => {
                const projectId = projectIds[0];

                const departmentData = department.map((departmentId) => ({
                    department_id: departmentId,
                    project_id: projectId.project_id,
                }));

                const specialistData = specialist.map((specialistId) => ({
                    specialist_id: specialistId,
                    project_id: projectId.project_id,
                }));

                return Promise.all([
                trx('project_department').insert(departmentData),
                trx('project_specialist').insert(specialistData),
                ]);
            })
            .then(() => {
                trx.commit();
                console.log('Project saved successfully');
                const message = `Hi, you have a new project ${name}. They paid ${deposit} shekels. Don't forget to call them within 1 hour. Details are available on your CRM.`;
                // const message = `Hi, you have a new customer ${companyName}. They paid ${deposit} shekels. Don't forget to call them within 1 hour. Details are available on your CRM.`;

                sendNotification(CHAT_ID, message);
                res.status(201).json({message: 'Project saved successfully'});
            })
            .catch((error) => {
                trx.rollback();
                console.log('Error saving Project: ', error);
                res.status(500).json({error: 'Error saving Project'});
            });
            })
            .catch((error) => {
                console.log('Transaction error: ', error);
                res.status(500).json({error: 'Error saving Project'});
            });
});


app.post('/api/saveSprint', (req, res) => {
    const {
        project,
        date_start,
        date_end,
        deadline,
        title,
        description,
        result,
        specialist
    } = req.body;
    
    db.transaction((trx) => {
        trx('sprint')
            .insert({project_id: project,
                    date_start,
                    date_end: null,
                    deadline,
                    title,
                    description,
                    result: null})
            .returning('sprint_id')
            .then((sprintIds) => {
                const sprintId = sprintIds[0].sprint_id;

            const specialistData = specialist.map((specialistId) => ({
                specialist_id: specialistId.value,
                sprint_id: sprintId,
            }));

    return trx('sprint_specialist').insert(specialistData);
    })
    .then(() => {
        trx.commit();
        console.log('Sprint saved successfully');
        res.status(201).json({message: 'Sprint saved successfully'});
    })
      .catch((error) => {
        trx.rollback();
        console.log('Error saving Sprint: ', error);
        res.status(500).json({error: 'Error saving Sprint'});
    });
  })
    .catch((error) => {
      console.log('Transaction error: ', error);
      res.status(500).json({error: 'Error saving Sprint'});
    });
});

app.post('/api/saveWork', (req, res) => {
    const {
        title, 
        description, 
        hours, 
        specialist, 
        date_creation, 
        date_complete, 
        deadline, 
        result, 
        sprint
    } = req.body;
    
    db('work')
    .insert({title, 
            description, 
            hours, 
            specialist_id: specialist, 
            date_creation, 
            date_complete, 
            deadline, 
            result, 
            sprint})
    .then(() => {
        console.log('Work saved successfully');
        res.status(201).json({message: 'Work saved successfully'});
    })
    .catch(error => {
        console.log('Error saving Work: ', error);
        res.status(500).json({error: 'Error saving Work'});
    });
})

app.put('/api/updateWork/:id', async (req, res) => {
    const workId = req.params.id;
    const {
        title,
        description,
        hours,
        specialist,
        date_creation,
        date_complete,
        deadline,
        result,
        sprint
    } = req.body;
    
    try {
        const changeWork = await db('work')
        .where('work_id', workId)
        .update(req.body);
        
        if (changeWork === 0) {
            return res.status(404).json({error: 'Work not found'});
        }
        
        res.json({message: 'Work updated successfully'});
    } catch (error) {
        console.log('Error updating work: ', error);
        res.status(500).json({error: 'Error updating work'});
    }
});

app.put('/api/updateSprint/:id', async (req, res) => {
    const sprintId = req.params.id;
    const {
        project,
        date_start,
        date_end,
        deadline,
        title,
        description,
        result,
        specialist
    } = req.body;
    
    try {
        const changeSprint = await db('sprint')
        .where('sprint_id', sprintId)
        .update(req.body);
        
        if (changeSprint === 0) {
            return res.status(404).json({error: 'Sprint not found'});
        }
        
        res.json({message: 'Sprint updated successfully'});
    } catch (error) {
        console.log('Error updating Sprint: ', error);
        res.status(500).json({error: 'Error updating Sprint'});
    }
});

app.put('/api/updateGrade/:id', async (req, res) => {
    const gradeId = req.params.id;
    const {
            grade_type,
            cost
    } = req.body;
    
    try {
        const changeGrade = await db('grade')
        .where('grade_id', gradeId)
        .update(req.body);
        
        if (changeGrade === 0) {
            return res.status(404).json({error: 'Grade not found'});
        }
        
        res.json({message: 'Grade updated successfully'});
    } catch (error) {
        console.log('Error updating Grade: ', error);
        res.status(500).json({error: 'Error updating Grade'});
    }
});

app.get("/api/getSpecialistsByDepartment/:departmentId", async (req, res) => {
  const {departmentId} = req.params;

  try {
    const employees = await db.select()
      .from('specialist')
      .where({department_id: departmentId, status: 'active'});

    res.json(spesialists);
  } catch (error) {
    console.log("Error getting specialists: ", error);
    res.status(500).json({error: "Error getting specialists"});
  }
});

app.post("/api/getFilteredData", async (req, res) => {
  const {
        selectedCompany,
        selectedProject,
        selectedSprint
    } = req.body;

  try {
    const filteredData = await getFilteredDataFromDB(selectedCompany,
                                                    selectedProject,
                                                    selectedSprint);
    res.json(filteredData);
  } catch (error) {
    console.log("Error getting filtered data: ", error);
    res.status(500).json({ error: "Error getting filtered data" });
  }
});


app.post("/api/getFilteredData", async (req, res) => {
  const {selectedCompany, selectedProject, selectedSprint} = req.body;

  try {
    const filteredCompanies = await knex
      .select()
      .from("company")
      .where({company_id: selectedCompany});

    const filteredProjects = await knex
      .select()
      .from("project")
      .where({project_id: selectedProject,
            company_id: selectedCompany});

    const filteredSprints = await knex
      .select()
      .from("sprint")
      .where({ print_id: selectedSprint,
            project_id: selectedProject});

    const filteredWorks = await knex
      .select()
      .from("work")
      .where({sprint_id: selectedSprint});

    const filteredData = {
            companies: filteredCompanies,
            projects: filteredProjects,
            sprints: filteredSprints,
            works: filteredWorks,
        };

    res.json(filteredData);
  } catch (error) {
    console.error("Error getting filtered data:", error);
    res.status(500).json({error: "Error getting filtered data"});
  }
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`server running on port ${process.env.PORT || 3000}`)
});

// app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended:true}));
// app.use(express.static(__dirname + '/public'));


// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "frontend/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});