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

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.49);
    float gsh = hash21(vec2(grow, floor(t * 8.55))) - 0.5;
    float gx = p.x + gsh * 0.59;
    v = sin(gx * 10.01 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.21));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.53 + ph), vnoise2(p * 4.53 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.53 + 1.92 * wq + vec2(1.7, 9.2) + t * 1.01),
                   vnoise2(p * 4.53 + 2.37 * wq + vec2(8.3, 2.8) - t * 0.49));
    v = vnoise2(p * 4.53 + 1.57 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	p *= 2.48;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.22, vec3(0.49, 0.47, 0.47), vec3(0.45, 0.31, 0.40), vec3(0.91, 0.79, 1.35), vec3(0.29, 0.23, 0.55));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.13 + time * 17.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
