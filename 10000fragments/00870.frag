uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.58 + sin(p.y * 5.73 + t * 5.55) * 2.84 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p = rot2(time * 1.26) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.86 + time * -0.74); }
	p *= 1.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.04, vec3(0.59, 0.42, 0.45), vec3(0.48, 0.49, 0.43), vec3(1.26, 0.88, 0.96), vec3(0.80, 0.51, 0.70));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
