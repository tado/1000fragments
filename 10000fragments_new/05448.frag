uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.28 + ph), sin(lt * 1.0 + t * 0.32)) * 0.55;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.38) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.44 + jf * 4.0), cos(t * 0.37 * jf)) * 0.59;
        xs += sin(length(p - im) * 119.27 - t * 4.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.55 + t * 3.08 + ph) * 0.7;
    float wb = sin(p.y * 17.48 - t * 0.69 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.21 / wf * sin(wf * 2.34 * q1.y + time * 1.58); q1.y += 0.33 / wf * cos(wf * 2.58 * q1.x + time * 1.90); }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.38, lr * 2.26 + time * -0.29); }
	q2.y += sin(q2.x * 5.77 + time * 1.25) * 0.20;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d3 = fieldC(q3, time, 1.32);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.03 + time * 0.01, vec3(0.50, 0.55, 0.42), vec3(0.44, 0.40, 0.33), vec3(0.82, 1.23, 1.15), vec3(0.08, 0.13, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
