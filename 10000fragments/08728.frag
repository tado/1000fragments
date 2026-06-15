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
    float rn = noise3(vec3(p * 1.97, t * 2.18 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.40 + t * 3.22 + ph) + sin(p.y * 16.12 - t * 5.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.49;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.75 * p.y + time * 0.70); p.y += 0.44 / wf * cos(wf * 3.28 * p.x + time * 1.92); }
	p = rot2(time * -1.21) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(2.27) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.44);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.00, vec3(0.45, 0.43, 0.45), vec3(0.39, 0.42, 0.45), vec3(1.16, 1.12, 0.96), vec3(0.62, 0.47, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
