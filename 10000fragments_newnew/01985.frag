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
    v = sin(p.x * 8.67 + sin(p.y * 2.65 + t * 3.30) * 1.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 2.56 + ph), vnoise2(p * 2.56 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 2.56 + 2.44 * wq + vec2(1.7, 9.2) + t * 0.90),
                   vnoise2(p * 2.56 + 1.69 * wq + vec2(8.3, 2.8) - t * 1.18));
    v = vnoise2(p * 2.56 + 2.29 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.40);
	float d = d1 + d2;
	vec3 col = palette(d * 0.80 + time * 0.05, vec3(0.52, 0.54, 0.57), vec3(0.33, 0.32, 0.36), vec3(1.35, 0.74, 1.37), vec3(0.95, 0.24, 0.71));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
