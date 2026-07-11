uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float noise3(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.76 + t * 4.81 + ph) + sin(p.y * 10.04 - t * 4.81 + ph)
        + sin((p.x + p.y) * 11.15 + t * 4.81 + ph) + sin(length(p) * 5.99 - t * 4.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = noise3(vec3(p * 4.34, t * 0.39 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.71;
	p += vec2(0.10, -0.09) * sin(length(p) * 5.07 - time * 1.39) * 0.11;
	p = rot2(time * -0.54) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 3.50 * p.y + time * 0.61); p.y += 0.47 / wf * cos(wf * 2.25 * p.x + time * 0.66); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 1.86 + time * -0.34); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.49);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.78 + time * 0.01, vec3(0.59, 0.41, 0.50), vec3(0.37, 0.43, 0.32), vec3(1.12, 0.89, 1.35), vec3(0.51, 0.01, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
