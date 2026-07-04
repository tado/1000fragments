uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.38 + ph), sin(lt * 2.0 + t * 1.33)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.12) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.81 + sr * 12.63 - t * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.40; q1 = rot2(1.82) * q1; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q1.x += 0.31 / wf * sin(wf * 2.34 * q1.y + time * 0.98); q1.y += 0.31 / wf * cos(wf * 2.49 * q1.x + time * 1.85); }
	q2 = fract(q2 * 1.09) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.58);
	float d = d1 * d2;
	vec3 col = vec3(0.42, 0.29, 0.51) * (0.15 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
