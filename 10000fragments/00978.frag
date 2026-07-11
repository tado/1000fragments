uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.08 + t * 1.56 + ph) + sin(p.y * 14.00 - t * 1.56 + ph)
        + sin((p.x + p.y) * 8.95 + t * 1.56 + ph) + sin(length(p) * 6.39 - t * 1.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	p = rot2(time * 1.37) * p;
	p = fract(p * 2.55) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.18, lr * 1.47 + time * 0.36); }
	p = rot2(1.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.17, vec3(0.55, 0.50, 0.48), vec3(0.36, 0.45, 0.34), vec3(1.12, 1.38, 0.75), vec3(0.28, 0.12, 0.79));
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
