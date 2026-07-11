uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.40; vec2 jc = vec2(-0.38 + 0.3 * sin(t * 1.62 + ph), 0.61 + 0.3 * cos(t * 0.35 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 17; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 17.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.94 + ph), vnoise2(p * 3.94 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.94 + 2.65 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 3.94 + 3.01 * wq + vec2(8.3, 2.8) - t * 1.01));
    v = vnoise2(p * 3.94 + 1.61 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	vec2 q1 = p; vec2 q2 = p;
	q1.y += sin(q1.x * 5.54 + time * 2.42) * 0.11;
	{ float fr = length(q1); q1 *= 1.0 + -0.39 * fr * fr; }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.76);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.57));
	vec3 col = hue(d * 0.70 + time * 0.18);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
