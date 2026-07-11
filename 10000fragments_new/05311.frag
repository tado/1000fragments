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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.20 - t * 5.18 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.16 + ph), vnoise2(p * 3.16 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.16 + 2.16 * wq + vec2(1.7, 9.2) + t * 0.55),
                   vnoise2(p * 3.16 + 2.78 * wq + vec2(8.3, 2.8) - t * 0.83));
    v = vnoise2(p * 3.16 + 3.43 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.72, length(q1) * 3.87 - time * 0.79); }
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.52; q2 = rot2(1.14) * q2; }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.08, length(q2) * 4.00 - time * 0.45); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.86);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.04 + time * 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
