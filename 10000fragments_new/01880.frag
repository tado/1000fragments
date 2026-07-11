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
    vec2 wq = vec2(vnoise2(p * 1.61 + ph), vnoise2(p * 1.61 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.61 + 3.34 * wq + vec2(1.7, 9.2) + t * 0.86),
                   vnoise2(p * 1.61 + 2.26 * wq + vec2(8.3, 2.8) - t * 0.91));
    v = vnoise2(p * 1.61 + 2.93 * wr) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.72 + t * 0.85 + ph) + sin(p.y * 2.54 - t * 0.85 + ph)
        + sin((p.x + p.y) * 10.09 + t * 0.85 + ph) + sin(length(p) * 4.73 - t * 0.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.12;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.17 + time * 0.40); }
	p += vec2(0.96, 0.93) * sin(length(p) * 3.39 - time * 1.55) * 0.33;
	p *= 1.88;
	p = abs(p) - 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.73 + time * 0.21, vec3(0.60, 0.42, 0.49), vec3(0.33, 0.47, 0.41), vec3(1.13, 1.28, 0.98), vec3(0.06, 0.18, 0.80));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.06 + time * 12.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
