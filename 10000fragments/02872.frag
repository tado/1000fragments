uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.36 + vec2(t * 0.73, -t * 0.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.67, lr * 2.36 + time * 0.68); }
	p = rot2(time * 0.31) * p;
	p += vec2(0.51, 0.24) * sin(length(p) * 3.37 - time * 1.71) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.19, vec3(0.48, 0.49, 0.42), vec3(0.50, 0.36, 0.31), vec3(1.03, 0.81, 1.31), vec3(0.33, 0.50, 0.27));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
