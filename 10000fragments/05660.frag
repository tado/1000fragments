uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.56; vec2 jc = vec2(-0.02 + 0.3 * sin(t * 1.69 + ph), 0.09 + 0.3 * cos(t * 1.01 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.19 * vnoise2(p * 2.57 + t * 1.34);
    v = sin(wr * 20.11 - t * 3.03 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.52 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.23 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 7.17) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.65, lr * 1.13 + time * 0.67); }
	q3 *= 2.58;
	q3 = rot2(length(q3) * 2.58 + time * 1.39) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.94);
	float d3 = fieldC(q3, time, 0.84);
	d2 = d2 * d3;
	float d = abs(d1 - d2);
	vec3 col = vec3(0.21, 0.87, 0.80) * (0.21 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
