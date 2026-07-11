uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.05) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 3.12 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.10);
    float gsh = hash21(vec2(grow, floor(t * 6.97))) - 0.5;
    float gx = p.x + gsh * 1.11;
    v = sin(gx * 7.92 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.70));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.08, lr * 1.71 + time * 0.99); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.38 + time * 0.24, vec3(0.57, 0.58, 0.47), vec3(0.30, 0.49, 0.49), vec3(0.85, 0.72, 0.85), vec3(0.45, 0.53, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
