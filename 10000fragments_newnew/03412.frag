uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.95 + ph), sin(lt * 5.0 + t * 1.48)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.48) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.81 * p.y + time * 2.16); p.y += 0.34 / wf * cos(wf * 1.74 * p.x + time * 1.66); }
	p = rot2(time * 0.81) * p;
	p = rot2(1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.82, 0.18, 0.52) * (0.08 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
