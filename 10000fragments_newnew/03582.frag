uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 30.88 - t * 7.85 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 33.50 - t * 4.47 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	p = (floor(p * 22.9) + 0.5) / 22.9;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.99, lr * 2.93 + time * -0.20); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.18;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.24, vec3(0.59, 0.50, 0.46), vec3(0.39, 0.38, 0.41), vec3(1.08, 0.80, 0.90), vec3(0.15, 0.17, 0.75));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
