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
    float rn = vnoise3(vec3(p * 4.37, t * 2.37 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.82 + ph), sin(lt * 5.0 + t * 0.77)) * 0.95;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.97) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	vec2 q1 = p; vec2 q2 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 2.12, length(q2) * 2.71 - time * 0.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.40);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.14, vec3(0.51, 0.57, 0.56), vec3(0.33, 0.46, 0.45), vec3(0.96, 0.89, 0.71), vec3(0.20, 0.38, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
