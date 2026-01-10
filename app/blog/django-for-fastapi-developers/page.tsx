import React from 'react';
import type { Metadata } from 'next';
import BlogHeader from '../_components/BlogHeader';

export const metadata: Metadata = {
  title: 'Django for FastAPI Developers',
  description:
    'A comprehensive guide to Django for developers coming from FastAPI. Learn the key differences, architectural patterns, and when to choose Django over FastAPI for your next project.',
  openGraph: {
    title: 'Django for FastAPI Developers',
    description:
      'A comprehensive guide to Django for developers coming from FastAPI. Learn the key differences, architectural patterns, and when to choose Django over FastAPI for your next project.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Django for FastAPI Developers',
    description:
      'A comprehensive guide to Django for FastAPI for developers coming from FastAPI. Learn the key differences, architectural patterns, and when to choose Django over FastAPI for your next project.',
  },
};

export default function BlogPage() {
  return (
    <section>
      <BlogHeader
        title='Django for FastAPI Developers'
        date='20-12-2025'
      />
      <div className='prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-300 mt-12 text-justify'>
        <div className='text-justify'>
          <h2 className='text-xl dark:text-neutral-200 font-serif'>Content</h2>
          <ul>
            <li>Introduction</li>
            <li>Philosophy and Design Patterns</li>
            <li>Project Structure</li>
            <li>Routing and Views</li>
            <li>ORM vs SQLAlchemy</li>
            <li>Request and Response Handling</li>
            <li>Dependency Injection vs Django's Approach</li>
            <li>Authentication and Permissions</li>
            <li>Forms and Validation</li>
            <li>Admin Panel</li>
            <li>Templates vs API-Only</li>
            <li>Middleware</li>
            <li>Testing</li>
            <li>Performance Considerations</li>
            <li>When to Choose Django</li>
            <li>Conclusion</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Introduction
          </h2>
          <p>
            If you're a FastAPI developer considering Django for your next project,
            you might be wondering how these two popular Python web frameworks compare.
            While FastAPI is modern, fast, and designed for building APIs with type hints
            and async support, Django is a mature, batteries-included framework that's been
            powering web applications since 2005.
          </p>
          <p>
            This guide will help you understand Django from a FastAPI perspective, highlighting
            the key differences, similarities, and when you might want to choose one over the other.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Philosophy and Design Patterns
          </h2>
          <p>
            <strong>FastAPI:</strong> FastAPI follows a minimalist, explicit approach.
            You declare exactly what you need, leverage Python type hints for validation,
            and build APIs that are fast and modern. It's heavily influenced by Flask but
            adds automatic data validation, serialization, and interactive API documentation.
          </p>
          <p>
            <strong>Django:</strong> Django follows the "batteries-included" philosophy.
            It provides everything you need out of the box: ORM, admin panel, authentication,
            form handling, and more. Django follows the MVT (Model-View-Template) pattern,
            though when building APIs, you'll primarily work with Models and Views.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Project Structure
          </h2>
          <p>
            In FastAPI, you typically start with a simple structure and add what you need:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI structure
myapp/
├── main.py
├── models.py
├── schemas.py
├── crud.py
└── database.py`}</code>
          </pre>
          <p>
            Django, on the other hand, uses a project-and-apps structure:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django structure
myproject/
├── manage.py
├── myproject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── myapp/
    ├── __init__.py
    ├── models.py
    ├── views.py
    ├── urls.py
    ├── admin.py
    ├── apps.py
    └── migrations/`}</code>
          </pre>
          <p>
            Django projects contain multiple apps, where each app is a self-contained module
            handling a specific functionality. This encourages reusability and separation of concerns.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Routing and Views
          </h2>
          <p>
            FastAPI uses decorators and path operations that feel intuitive:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.post("/items/")
async def create_item(item: Item):
    return item`}</code>
          </pre>
          <p>
            Django has multiple ways to define views, but with Django REST Framework (DRF),
            it becomes similar:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django REST Framework
from rest_framework import viewsets, serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

class ItemSerializer(serializers.Serializer):
    name = serializers.CharField()
    price = serializers.FloatField()

@api_view(['GET'])
def read_item(request, item_id):
    return Response({"item_id": item_id})

@api_view(['POST'])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Or using ViewSets (more Django-ish)
class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()`}</code>
          </pre>
          <p>
            Django's URL routing is centralized in <code>urls.py</code> files:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('items/<int:item_id>/', views.read_item),
    path('items/', views.create_item),
]`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            ORM vs SQLAlchemy
          </h2>
          <p>
            FastAPI commonly uses SQLAlchemy, which offers flexibility and explicit control:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# SQLAlchemy (FastAPI)
from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)

# Querying
user = db.query(User).filter(User.email == "test@example.com").first()
users = db.query(User).offset(0).limit(10).all()`}</code>
          </pre>
          <p>
            Django's ORM is more integrated and uses a different syntax:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django ORM
from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'users'

# Querying
user = User.objects.filter(email="test@example.com").first()
users = User.objects.all()[0:10]

# Django ORM supports complex queries elegantly
users = User.objects.filter(
    name__icontains="john"
).exclude(
    email__endswith="@spam.com"
).order_by('-created_at')`}</code>
          </pre>
          <p>
            <strong>Key differences:</strong>
          </p>
          <ul>
            <li>Django ORM uses <code>objects</code> manager pattern</li>
            <li>Django has built-in migrations through <code>python manage.py makemigrations</code></li>
            <li>Django's query syntax uses double underscores for lookups (<code>__icontains</code>, <code>__gte</code>)</li>
            <li>Django models automatically get <code>id</code>, <code>created_at</code> fields if you want them</li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Request and Response Handling
          </h2>
          <p>
            FastAPI automatically validates and serializes data using Pydantic:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI - automatic validation
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    age: int = Field(gt=0, lt=150)

@app.post("/users/")
async def create_user(user: UserCreate):
    # user is already validated!
    return {"email": user.email}`}</code>
          </pre>
          <p>
            Django REST Framework uses serializers:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django REST Framework
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'age']
        extra_kwargs = {
            'password': {'write_only': True},
            'age': {'min_value': 1, 'max_value': 149}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Dependency Injection vs Django's Approach
          </h2>
          <p>
            FastAPI's dependency injection system is one of its standout features:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI dependencies
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    return verify_token(token)

@app.get("/users/me")
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    return current_user`}</code>
          </pre>
          <p>
            Django doesn't have built-in dependency injection. Instead, it uses:
          </p>
          <ul>
            <li><strong>Middleware</strong> for cross-cutting concerns</li>
            <li><strong>Request object</strong> that carries user, session, etc.</li>
            <li><strong>Decorators</strong> for reusable logic</li>
          </ul>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django approach
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def read_users_me(request):
    # request.user is automatically populated by middleware
    return Response({
        'email': request.user.email,
        'name': request.user.name
    })`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Authentication and Permissions
          </h2>
          <p>
            FastAPI requires you to implement auth, typically with libraries like
            <code>python-jose</code> and <code>passlib</code>:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI - manual setup
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        # ... validate and return user
    except JWTError:
        raise HTTPException(status_code=401)`}</code>
          </pre>
          <p>
            Django provides authentication out of the box:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django - built-in auth
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

# Session-based auth (traditional Django)
user = authenticate(username='john', password='secret')
if user:
    login(request, user)

# Token-based auth (DRF)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class MyView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello {request.user.username}"})`}</code>
          </pre>
          <p>
            Django also supports JWT, OAuth2, and social auth through packages like
            <code>djangorestframework-simplejwt</code> and <code>django-allauth</code>.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Forms and Validation
          </h2>
          <p>
            FastAPI relies on Pydantic for validation, while Django has its own form system:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django Forms (useful for HTML forms)
from django import forms

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['email', 'name', 'age']

    def clean_age(self):
        age = self.cleaned_data['age']
        if age < 18:
            raise forms.ValidationError("Must be 18 or older")
        return age

# In view
form = UserForm(request.POST)
if form.is_valid():
    form.save()`}</code>
          </pre>
          <p>
            For APIs, you'd typically use DRF serializers instead of forms, but Django's
            form system is powerful for server-rendered HTML applications.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Admin Panel
          </h2>
          <p>
            This is where Django truly shines. FastAPI has no built-in admin interface,
            while Django provides a full-featured admin panel out of the box:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django admin.py
from django.contrib import admin
from .models import User, Product

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'created_at', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['email', 'name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock']
    list_editable = ['price', 'stock']
    actions = ['mark_as_discontinued']

    def mark_as_discontinued(self, request, queryset):
        queryset.update(is_active=False)`}</code>
          </pre>
          <p>
            With just a few lines of code, you get a complete admin interface with
            CRUD operations, filtering, searching, bulk actions, and more. This is
            incredibly valuable for internal tools, content management, and rapid development.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Templates vs API-Only
          </h2>
          <p>
            FastAPI is primarily designed for building APIs. If you need server-side
            rendering, you'd integrate a template engine like Jinja2 manually.
          </p>
          <p>
            Django was originally built for server-rendered websites and has excellent
            template support:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django template view
from django.shortcuts import render

def product_list(request):
    products = Product.objects.filter(is_active=True)
    return render(request, 'products/list.html', {
        'products': products
    })`}</code>
          </pre>
          <p>
            Django templates support inheritance, includes, filters, and tags, making
            them powerful for building traditional web applications. However, for modern
            SPA backends, you'd typically use Django REST Framework and skip templates entirely.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Middleware
          </h2>
          <p>
            Both frameworks support middleware, but with different APIs:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI middleware
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response`}</code>
          </pre>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django middleware
class ProcessTimeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        process_time = time.time() - start_time
        response['X-Process-Time'] = str(process_time)
        return response

# Add to settings.py
MIDDLEWARE = [
    'myapp.middleware.ProcessTimeMiddleware',
    # ... other middleware
]`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Testing
          </h2>
          <p>
            FastAPI uses standard pytest with TestClient:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# FastAPI testing
from fastapi.testclient import TestClient

def test_read_item():
    client = TestClient(app)
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"item_id": 1}`}</code>
          </pre>
          <p>
            Django has a comprehensive testing framework built-in:
          </p>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django testing
from django.test import TestCase, Client
from rest_framework.test import APITestCase

class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email='test@example.com')

    def test_get_user(self):
        response = self.client.get(f'/users/{self.user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_create_user(self):
        data = {'email': 'new@example.com', 'name': 'New User'}
        response = self.client.post('/users/', data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(email='new@example.com').exists())`}</code>
          </pre>
          <p>
            Django's test framework includes database transactions, fixtures, test client,
            and more. It automatically creates a test database for each test run.
          </p>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Performance Considerations
          </h2>
          <p>
            <strong>FastAPI advantages:</strong>
          </p>
          <ul>
            <li>Built on ASGI (async support out of the box)</li>
            <li>Generally faster for I/O-bound operations with async/await</li>
            <li>Lower overhead for simple API endpoints</li>
            <li>Excellent for microservices and high-performance APIs</li>
          </ul>
          <p>
            <strong>Django considerations:</strong>
          </p>
          <ul>
            <li>Traditionally WSGI-based (synchronous), but Django 3.1+ supports ASGI</li>
            <li>Can handle async views with <code>async def</code></li>
            <li>Heavier due to middleware and built-in features</li>
            <li>Excellent caching support (Redis, Memcached, database-level)</li>
            <li>Database query optimization through select_related and prefetch_related</li>
          </ul>
          <pre className='bg-neutral-100 dark:bg-neutral-900 p-4 rounded overflow-x-auto'>
            <code>{`# Django async views (Django 3.1+)
from django.http import JsonResponse

async def my_async_view(request):
    # Can use await with async libraries
    data = await some_async_function()
    return JsonResponse(data)

# Query optimization
users = User.objects.select_related('profile').prefetch_related('orders')
# This reduces N+1 query problems`}</code>
          </pre>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            When to Choose Django
          </h2>
          <p>
            Choose Django when you need:
          </p>
          <ul>
            <li>
              <strong>Rapid development:</strong> The admin panel, built-in auth, and
              ORM accelerate development significantly
            </li>
            <li>
              <strong>Full-stack application:</strong> Building both backend API and
              server-rendered pages
            </li>
            <li>
              <strong>Content management:</strong> The admin panel is unmatched for
              managing content and data
            </li>
            <li>
              <strong>Team familiarity:</strong> Your team knows Django or you're
              building on existing Django codebases
            </li>
            <li>
              <strong>Batteries-included approach:</strong> You want everything
              integrated and working together
            </li>
            <li>
              <strong>Complex business logic:</strong> Django's ORM and architecture
              scale well for complex domains
            </li>
            <li>
              <strong>Traditional CRUD applications:</strong> Django excels at
              database-driven applications
            </li>
          </ul>
          <p>
            Choose FastAPI when you need:
          </p>
          <ul>
            <li>
              <strong>High performance APIs:</strong> Especially with async I/O operations
            </li>
            <li>
              <strong>Modern Python features:</strong> Type hints, async/await everywhere
            </li>
            <li>
              <strong>Microservices:</strong> Lightweight, focused services
            </li>
            <li>
              <strong>API-first design:</strong> No need for admin panels or templates
            </li>
            <li>
              <strong>OpenAPI documentation:</strong> Automatic, interactive docs are crucial
            </li>
            <li>
              <strong>Data validation:</strong> Pydantic's validation is excellent
            </li>
          </ul>

          <h2 className='text-xl dark:text-neutral-200 font-serif'>
            Conclusion
          </h2>
          <p>
            Django and FastAPI are both excellent frameworks, but they solve different
            problems. Django is a full-featured web framework designed for rapid development
            of complete web applications, while FastAPI is a modern, high-performance
            framework optimized for building APIs.
          </p>
          <p>
            As a FastAPI developer learning Django, you'll find:
          </p>
          <ul>
            <li>The learning curve is manageable - many concepts translate directly</li>
            <li>Django's "magic" (like the admin panel) can save enormous amounts of time</li>
            <li>The ecosystem is mature with solutions for almost every problem</li>
            <li>Django REST Framework brings Django's API development closer to FastAPI's experience</li>
            <li>You can even use both - Django for your main app with admin, FastAPI for high-performance microservices</li>
          </ul>
          <p>
            The best choice depends on your project requirements. Many developers keep
            both in their toolkit, choosing the right tool for each job. Don't think of
            it as Django vs FastAPI - think of it as Django AND FastAPI, each excelling
            in different scenarios.
          </p>
        </div>
      </div>
    </section>
  );
}
