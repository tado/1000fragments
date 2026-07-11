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

float field(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 6.47, t * 2.09 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.00), cos(time * 1.12)) * 0.22;
	float an = atan(p.y, p.x) + time * -0.55;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.91 / 3.1415927, 1.01 / r + time * 0.93);
	tv.x += tv.y * 0.10;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.16, vec3(0.48, 0.48, 0.40), vec3(0.37, 0.50, 0.45), vec3(1.14, 0.99, 1.14), vec3(0.62, 0.39, 0.32));
	col *= clamp(r * 2.70, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
