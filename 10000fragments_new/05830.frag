uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.11, t * 1.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.90 + ph), sin(lt * 1.0 + t * 1.30)) * 0.61;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.41) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.30 / wf * sin(wf * 3.39 * q1.y + time * 1.40); q1.y += 0.22 / wf * cos(wf * 3.76 * q1.x + time * 1.54); }
	q1 = rot2(q1.y * 2.02 + time * 0.46) * q1;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.09, lr * 1.08 + time * -0.50); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.71);
	float d = d1 * d2;
	vec3 col = hue(d * 1.34 + time * 0.30);
	col = clamp((col - 0.5) * 1.68 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
