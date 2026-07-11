uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.82 + ph), sin(lt * 5.0 + t * 0.98)) * 0.81;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.90) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.67 + t * 3.00 + ph) * 0.7;
    float wb = sin(p.y * 14.01 - t * 2.65 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.20;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.13;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 2.49 + time * 0.34) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.29, lr * 2.12 + time * -0.38); }
	q2 = fract(q2 * 1.21) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.46);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.22, 0.28), vec3(0.86, 0.62, 0.85), cc);
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
