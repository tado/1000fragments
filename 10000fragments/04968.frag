uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.14) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.16 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.50 + t * 1.38 + ph) + sin(p.y * 7.88 - t * 1.38 + ph)
        + sin((p.x + p.y) * 2.60 + t * 1.38 + ph) + sin(length(p) * 9.56 - t * 1.38 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.40, lr * 2.07 + time * -0.64); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = d1 + d2;
	vec3 col = palette(d * 1.66 + time * 0.28, vec3(0.48, 0.40, 0.55), vec3(0.42, 0.37, 0.46), vec3(1.35, 0.85, 1.37), vec3(0.28, 0.10, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
