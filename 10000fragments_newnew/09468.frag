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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.52 + ph), vnoise2(p * 2.52 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.52 + 1.71 * wq + vec2(1.7, 9.2) + t * 1.06),
                   vnoise2(p * 2.52 + 1.45 * wq + vec2(8.3, 2.8) - t * 0.45));
    v = vnoise2(p * 2.52 + 2.71 * wr) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.62 + t * 0.42) - 0.5) * 2.0;
    v = sin((p.y * 3.57 + zx * 0.97 + t * 1.44) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.52; }
	q1 += vec2(0.09, -0.65) * sin(length(q1) * 5.51 - time * 1.38) * 0.18;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.90;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.79));
	vec3 col = palette(d * 1.48 + time * 0.10, vec3(0.47, 0.46, 0.60), vec3(0.40, 0.45, 0.41), vec3(0.94, 1.13, 0.82), vec3(0.01, 0.45, 0.78));
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
