uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.43 + ph), sin(lt * 2.0 + t * 1.28)) * 0.76;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.54) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.44 + t * 2.01 + ph) + sin(p.y * 10.23 - t * 5.13 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.53 * sin(mf + 3.0) + ph), cos(t * 1.95 * cos(mf + 3.0) + ph));
        ms += 0.072 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.24 / wf * sin(wf * 1.51 * q1.y + time * 1.81); q1.y += 0.22 / wf * cos(wf * 1.55 * q1.x + time * 2.19); }
	q1 = rot2(length(q1) * 1.76 + time * 0.43) * q1;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.48, length(q2) * 3.32 - time * 0.90); }
	q2 = rot2(q2.y * -2.42 + time * 0.66) * q2;
	q3.y += sin(q3.x * 4.22 + time * 3.80) * 0.17;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.81);
	float d3 = fieldC(q3, time, 0.74);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.85 + time * 0.22);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
