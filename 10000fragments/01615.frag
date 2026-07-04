uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
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

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.03);
    float gsh = hash21(vec2(grow, floor(t * 4.15))) - 0.5;
    float gx = p.x + gsh * 0.99;
    v = sin(gx * 14.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.44));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 5.73, t * 1.75 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	p = rot2(p.y * -2.99 + time * 0.41) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.52);
	float d = d1 * d2;
	vec3 col = palette(d * 1.50 + time * 0.03, vec3(0.49, 0.49, 0.57), vec3(0.31, 0.41, 0.45), vec3(0.73, 1.26, 0.70), vec3(0.93, 0.44, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
