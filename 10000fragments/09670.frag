uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.88) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 3.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.07, lr * 1.26 + time * -0.24); }
	p = rot2(length(p) * 2.45 + time * 0.89) * p;
	p = rot2(2.05) * p;
	p *= 3.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.20, vec3(0.46, 0.50, 0.43), vec3(0.48, 0.35, 0.49), vec3(1.24, 1.37, 1.21), vec3(0.08, 0.51, 0.00));
	col = clamp((col - 0.5) * 2.02 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
