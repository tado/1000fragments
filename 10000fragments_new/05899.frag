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

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.75 + ph), vnoise2(p * 2.75 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.75 + 3.85 * wq + vec2(1.7, 9.2) + t * 0.42),
                   vnoise2(p * 2.75 + 3.62 * wq + vec2(8.3, 2.8) - t * 0.85));
    v = vnoise2(p * 2.75 + 2.01 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.23, t * 0.90 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.37);
	float d = d1 * d2;
	vec3 col = vec3(0.51, 0.58, 0.88) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.84 + 0.16 * sin(gl_FragCoord.y * 1.61 + time * 12.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
