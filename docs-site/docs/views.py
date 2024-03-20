from django.shortcuts import render


def index(request):
    return render(request, 'docs/index.html')


def buttons(request):
    return render(request, 'docs/buttons.html')


def code(request):
    return render(request, 'docs/code.html')


def collapse(request):
    return render(request, 'docs/collapse.html')


def colors(request):
    return render(request, 'docs/colors.html')


def forms(request):
    return render(request, 'docs/forms.html')


def js_forms(request):
    return render(request, 'docs/js_forms.html')


def icons(request):
    return render(request, 'docs/icons.html')


def img(request):
    return render(request, 'docs/img.html')


def loader(request):
    return render(request, 'docs/loader.html')


def mega_sidenav(request):
    return render(request, 'docs/mega_sidenav.html')


def modal(request):
    return render(request, 'docs/modal.html')


def msgs(request):
    return render(request, 'docs/msgs.html')


def navbar_x(request):
    return render(request, 'docs/navbar_x.html')


def navbar_y(request):
    return render(request, 'docs/navbar_y.html')


def sidenav(request):
    return render(request, 'docs/sidenav.html')


def tables(request):
    return render(request, 'docs/tables.html')


def template(request):
    return render(request, 'docs/template.html')


def typography(request):
    return render(request, 'docs/typography.html')


def utils(request):
    return render(request, 'docs/utils.html')


def toast(request):
    return render(request, 'docs/toast.html')


def tasks(request):
    return render(request, 'docs/tasks.html')


def slider(request):
    return render(request, 'docs/slider.html')


def status(request):
    return render(request, 'docs/status.html')


def chips(request):
    return render(request, 'docs/chips.html')


def pagination(request):
    return render(request, 'docs/pagination.html')


def breadcrumbs(request):
    return render(request, 'docs/breadcrumbs.html')


def progress_indicator(request):
    return render(request, 'docs/progress_indicator.html')


def big_radio(request):
    return render(request, 'docs/big_radio.html')


def component(request):
    return render(request, 'docs/component.html')


def show_hide_password(request):
    return render(request, 'docs/show_hide_password.html')


def tile(request):
    return render(request, 'docs/tile.html')


def select_all(request):
    return render(request, 'docs/select_all.html')


def select(request):
    return render(request, 'docs/select.html')


def lazy_images(request):
    return render(request, 'docs/lazy_images.html')
