uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.22 + t * 2.79 + ph) + sin(p.y * 4.39 - t * 5.24 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.76;
	p = fract(p * 2.89) - 0.5;
	p += vec2(0.74, 0.51) * sin(length(p) * 2.15 - time * 1.21) * 0.14;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.52, lr * 1.37 + time * -0.22); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.14, vec3(0.44, 0.46, 0.47), vec3(0.34, 0.33, 0.45), vec3(1.39, 1.24, 0.82), vec3(0.11, 0.33, 0.83));
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
