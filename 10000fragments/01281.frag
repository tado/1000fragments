uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.09 + t * 1.50 + ph) + sin(p.y * 5.80 - t * 1.50 + ph)
        + sin((p.x + p.y) * 11.27 + t * 1.50 + ph) + sin(length(p) * 13.65 - t * 1.50 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.64) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.89 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 2.97 + time * 0.49); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.00 + time * 0.19, vec3(0.46, 0.58, 0.54), vec3(0.42, 0.39, 0.38), vec3(1.38, 1.30, 1.09), vec3(0.76, 0.81, 0.73));
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
