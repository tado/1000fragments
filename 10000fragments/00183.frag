uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.58 + t * 3.32 + ph) + sin(p.y * 11.42 - t * 5.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.71) * p;
	p = fract(p * 1.95) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.09, lr * 1.08 + time * -0.46); }
	p = rot2(p.y * -1.49 + time * 0.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.56 + time * 0.16, vec3(0.44, 0.56, 0.51), vec3(0.45, 0.34, 0.50), vec3(1.22, 0.88, 1.36), vec3(0.20, 0.48, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
