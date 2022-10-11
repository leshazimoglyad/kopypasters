import dichaUrl from "../../images/footer/footer-modal/dicha.jpg";
import halinaUrl from "../../images/footer/footer-modal/galina.jpg";
import ivanUrl from "../../images/footer/footer-modal/ivan.jpg";
import igorUrl from "../../images/footer/footer-modal/igorSmorodsky.jpg";
import illiaUrl from "../../images/footer/footer-modal/illiaKazmin.jpg";
import knihinUrl from "../../images/footer/footer-modal/knihinOleksii.jpg";
import zimohliadUrl from "../../images/footer/footer-modal/oleksiiZimohliad.jpg";
import andriiUrl from "../../images/footer/footer-modal/andriiFyl.jpg";

const markup = `<div class="team">
        <div class="team__card">
                <img src="${dichaUrl}" alt="Dima" class="team__photo" />
                <p class="team__name">Dmytro Chahin</p>
        </div>
        <div class="team__card">
                <img src="${halinaUrl}" alt="Halina" class="team__photo" />
                <p class="team__name">Halyna Remeniak</p>
        </div>
        <div class="team__card">
                <img src="${ivanUrl}" alt="Ivan" class="team__photo" />
                <p class="team__name">Ivan Vodopianov</p>
        </div>
        <div class="team__card">
                <img src="${igorUrl}" alt="Igor" class="team__photo" />
                <p class="team__name">Igor Smorodsky</p>
        </div>
        <div class="team__card">
                <img src="${illiaUrl}" alt="Illia" class="team__photo" />
                <p class="team__name">Illia Kazmin</p>
        </div>
        <div class="team__card">
                <img src="${knihinUrl}" alt="Knihin" class="team__photo" />
                <p class="team__name">Oleksii Knihin</p>
        </div>
        <div class="team__card">
                <img src="${zimohliadUrl}" alt="Zimohliad" class="team__photo" />
                <p class="team__name">Oleksii Zimohliad</p>
        </div>
        <div class="team__card">
                <img src="${andriiUrl}" alt="Andrii" class="team__photo" />
                <p class="team__name">Andrii Fyl</p>
        </div>
        <div class="team__card">
                <img src="" alt="" class="team__photo" />
                <p class="team__name"></p>
        </div>
</div>`;

const teamOpen = document.querySelector(`.footer__link`);

teamOpen.addEventListener("clic", openModal);
