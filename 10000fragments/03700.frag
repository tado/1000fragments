uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.89) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 3.02 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.27 + vec2(t * 2.06, -t * 2.06) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 2.28 + time * -0.78); }
	{ p = vec2(atan(p.y, p.x) * 1.55, length(p) * 3.32 - time * 0.31); }
	p += vec2(0.98, -0.31) * sin(length(p) * 4.15 - time * 0.52) * 0.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.55);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.58, 0.59, 0.41), vec3(0.40, 0.48, 0.35), vec3(0.83, 0.85, 1.12), vec3(0.17, 0.87, 0.11));
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
