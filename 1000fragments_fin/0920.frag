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

float field(vec2 p, float t, float ph){
    float v;
    float rn = vnoise3(vec3(p * 4.12, t * 1.86 + ph));
    v = (1.0 - abs(rn * 2.0 - 1.0)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.70) * 1.39), cos((time * 0.70) * 1.29)) * 0.06;
	float an = atan(p.y, p.x) + (time * 0.70) * -0.58;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.73 / 3.1415927, 1.42 / r - (time * 0.70) * 0.94);
	float d = field(tv, (time * 0.70), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.029, 0.038, 0.136), vec3(0.105, 0.468, 0.501), smoothstep(0.0, 0.41, cc)), vec3(0.975, 0.839, 0.459), smoothstep(0.41, 1.0, cc));
	col *= clamp(r * 2.37, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.002, 0.975, 1.024);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
