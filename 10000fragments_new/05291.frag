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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.01 + 0.42 * sin(t * 0.77)) + vec2(-0.75, -0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.82; vec2 jc = vec2(0.29 + 0.3 * sin(t * 1.53 + ph), -0.56 + 0.3 * cos(t * 1.68 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 29; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 29.0 * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 5.02, t * 1.09 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.74;
	q2 = (floor(q2 * 11.8) + 0.5) / 11.8;
	q2 *= 2.28;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.89);
	float d3 = fieldC(q3, time, 0.78);
	d2 = 0.5 * (d2 + d3);
	float d = d1 * d2;
	vec3 col = vec3(0.66, 0.82, 0.46) * (0.20 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
