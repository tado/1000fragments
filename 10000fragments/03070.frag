uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.43 + vec2(t * 1.86, -t * 1.86) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	p *= 2.65;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.79, lr * 1.52 + time * 0.34); }
	p = rot2(time * -1.30) * p;
	p = fract(p * 1.75) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.22, vec3(0.48, 0.55, 0.47), vec3(0.49, 0.32, 0.38), vec3(1.24, 1.25, 1.04), vec3(0.54, 0.10, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
