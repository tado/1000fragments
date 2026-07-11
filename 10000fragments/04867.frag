uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

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
    v = noise3(vec3(p * 5.65, t * 1.35 + ph)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.39 - t * 2.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	p = fract(p * 1.19) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 4.89 - time * 0.71); }
	p += vec2(0.34, -0.13) * sin(length(p) * 3.95 - time * 1.59) * 0.26;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.80 * p.y + time * 0.68); p.y += 0.45 / wf * cos(wf * 2.95 * p.x + time * 2.00); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.14);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.68 + time * 0.29, vec3(0.49, 0.53, 0.43), vec3(0.46, 0.33, 0.41), vec3(0.85, 0.99, 1.18), vec3(0.64, 0.61, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
