uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.78) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 1.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 1.37 + time * 0.49); }
	p = fract(p * 1.55) - 0.5;
	p = abs(p) - 0.24;
	p = rot2(length(p) * 1.23 + time * 0.60) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.16 + time * 0.07, vec3(0.42, 0.50, 0.43), vec3(0.50, 0.31, 0.45), vec3(1.28, 1.19, 0.81), vec3(0.77, 0.52, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
