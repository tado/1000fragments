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
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 5.50 * sin(t * 0.79) + t * 4.74 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 4.24, t * 0.52 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p;
	q1.x += sin(q1.y * 3.44 + time * 1.30) * 0.35;
	q1 = rot2(length(q1) * 2.96 + time * 1.44) * q1;
	q2 += vec2(-0.49, -0.41) * sin(length(q2) * 4.09 - time * 1.57) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.30);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.16, 0.16), vec3(0.94, 0.65, 0.72), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
