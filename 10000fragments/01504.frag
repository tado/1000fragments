uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.45;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.75; kp = rot2(2.14) * kp; kp *= 1.38; }
    v = sin(kp.x * 2.49 - t * 2.24 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.69 + 0.3 * sin(t * 1.73 + ph), -0.62 + 0.3 * cos(t * 0.39 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 19.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.66 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.29 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 5.99) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.13;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.98, lr * 1.37 + time * 0.28); }
	q1 = rot2(1.31) * q1;
	q3.x += sin(q3.y * 7.47 + time * 1.52) * 0.20;
	q3 = (floor(q3 * 22.5) + 0.5) / 22.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d3 = fieldC(q3, time, 0.52);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.76 + time * 0.09, vec3(0.50, 0.52, 0.51), vec3(0.38, 0.38, 0.34), vec3(0.99, 1.02, 0.74), vec3(0.38, 0.10, 0.61));
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
