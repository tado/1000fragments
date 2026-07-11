uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 perm(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
float vnoise3(vec3 p){
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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.97 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.58) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.17 + t * 0.80 + ph) * 0.7;
    float wb = sin(p.y * 4.06 - t * 1.72 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.36;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 6.47, t * 1.71 + ph)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 0.54) * q1;
	q1 = (floor(q1 * 23.4) + 0.5) / 23.4;
	q3 = rot2(time * 0.70) * q3;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.41 / wf * sin(wf * 2.03 * q3.y + time * 0.61); q3.y += 0.41 / wf * cos(wf * 2.06 * q3.x + time * 0.82); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 1.13);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.46 + time * 0.27);
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
