uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.34) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 3.27 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.92 + sin(p.y * 1.09 + t * 1.17) * 3.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.08) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.36, lr * 1.99 + time * -0.46); }
	p = fract(p * 1.84) - 0.5;
	p = rot2(time * -0.88) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.79 + time * 0.18, vec3(0.54, 0.42, 0.42), vec3(0.32, 0.45, 0.47), vec3(1.13, 0.94, 0.89), vec3(0.60, 0.01, 0.97));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
