uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.20 * cos(sa * 9.0 + t * 2.73 + ph);
    v = sin((sr - petal) * 12.61);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.81 + ph), vnoise2(p * 3.81 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.81 + 2.51 * wq + vec2(1.7, 9.2) + t * 0.31),
                   vnoise2(p * 3.81 + 1.17 * wq + vec2(8.3, 2.8) - t * 0.98));
    v = vnoise2(p * 3.81 + 1.71 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.54) * q1;
	q2 = abs(q2);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.38));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.31 + time * 0.00);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
