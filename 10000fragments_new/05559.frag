uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.35 + t * 1.60 + ph) * 0.7;
    float wb = sin(p.y * 19.01 - t * 2.33 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.24;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.42 + ph), sin(lt * 1.0 + t * 0.58)) * 0.69;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.01) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -1.32) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 2.39 * q2.y + time * 1.93); q2.y += 0.46 / wf * cos(wf * 2.25 * q2.x + time * 1.70); }
	q2.y += sin(q2.x * 5.93 + time * 1.67) * 0.32;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.25 + time * 0.06);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
