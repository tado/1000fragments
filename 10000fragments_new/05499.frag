uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.52 + ph), sin(lt * 4.0 + t * 1.17)) * 0.80;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.50) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.58 * p.y + time * 1.20); p.y += 0.21 / wf * cos(wf * 3.52 * p.x + time * 0.73); }
	p = abs(p) - 0.60;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.34));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
