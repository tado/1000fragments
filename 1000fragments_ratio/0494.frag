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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.90;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.70; kp = rot2(0.35) * kp; kp *= 1.24; }
    v = sin(kp.y * 1.20 - t * 2.20 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = vnoise3(vec3(p * 2.57, t * 0.92 + ph)) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.93 + ga * 5.0 - t * 2.96 + ph);
    v = arm * exp(-gr * 1.30);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 18.9) + 0.5) / 18.9;
	{ float fr = length(q1); q1 *= 1.0 + -0.20 * fr * fr; }
	q3 += vec2(0.25, 0.13) * sin(length(q3) * 5.00 - (time * 0.84) * 2.20) * 0.32;
	float d1 = fieldA(q1, (time * 0.84), 0.0);
	float d2 = fieldB(q2, (time * 0.84), 0.92);
	float d3 = fieldC(q3, (time * 0.84), 0.43);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.64, 0.64, 0.71) + vec3(0.10, 0.10, 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.971, 0.924) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
