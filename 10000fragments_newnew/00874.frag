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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.39;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.28 - t * 4.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.82, t * 2.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 3.54, t * 1.18 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 1.53));
	q1 = rot2(length(q1) * -2.37 + time * 1.22) * q1;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.34; q2 = rot2(2.06) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.10);
	float d3 = fieldC(q3, time, 1.00);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.41 + time * 0.21, vec3(0.59, 0.44, 0.45), vec3(0.42, 0.35, 0.34), vec3(1.18, 0.82, 1.18), vec3(0.20, 0.69, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
