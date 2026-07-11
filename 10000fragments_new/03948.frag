uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.87;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 11.42 - t * 3.37 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.36 + ph), sin(lt * 1.0 + t * 1.00)) * 0.66;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.64) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 1.14 + time * 1.06) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.90, lr * 2.37 + time * -0.66); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.29);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.42));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.91, 0.81, 0.59) + vec3(0.05, 0.20, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
