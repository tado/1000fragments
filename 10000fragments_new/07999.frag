uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.32 + ph), sin(lt * 4.0 + t * 1.31)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.02) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.39 + t * 1.72 + ph) + sin(p.y * 3.88 - t * 4.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q2 = abs(q2);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.32 / wf * sin(wf * 3.55 * q2.y + time * 1.54); q2.y += 0.38 / wf * cos(wf * 1.84 * q2.x + time * 1.18); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.57);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 1.98 + time * 0.97);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 2.28 + time * 17.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
