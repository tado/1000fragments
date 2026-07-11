uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.23 * pow(abs(cos(ra * 3.0 + t * 2.82)), 1.53);
    v = sin((rr - pet) * 14.69 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.53 + ph), sin(lt * 4.0 + t * 0.99)) * 0.98;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.77) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 2.75, t * 0.85 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 3.48 + time * 1.98) * 0.15;
	q1 += vec2(-0.24, -0.17) * sin(length(q1) * 2.47 - time * 1.21) * 0.32;
	{ float fr = length(q2); q2 *= 1.0 + 0.64 * fr * fr; }
	q3 = abs(q3) - 0.27;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.79);
	float d3 = fieldC(q3, time, 1.06);
	d2 = abs(d2 - d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.83 + time * 0.34, vec3(0.40, 0.49, 0.46), vec3(0.42, 0.41, 0.49), vec3(1.23, 0.71, 1.22), vec3(0.81, 0.63, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
