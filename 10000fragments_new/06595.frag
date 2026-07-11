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
    v = 0.5 * sin(length(p) * 23.35 - t * 1.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.81 + ph), vnoise2(p * 1.81 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.81 + 3.98 * wq + vec2(1.7, 9.2) + t * 0.62),
                   vnoise2(p * 1.81 + 3.82 * wq + vec2(8.3, 2.8) - t * 0.82));
    v = vnoise2(p * 1.81 + 3.75 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.11;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(0.59) * q1;
	for(int fo = 0; fo < 3; fo++){ q1 = abs(q1) - 0.19; q1 = rot2(1.39) * q1; }
	q2 = rot2(1.77) * q2;
	q2.x += sin(q2.y * 6.51 + time * 2.97) * 0.21;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.42);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.90 + time * 0.05);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
