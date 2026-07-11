uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.25 - t * 8.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.85 + time * -0.33); }
	p = rot2(p.y * 1.99 + time * 0.86) * p;
	p = fract(p * 1.78) - 0.5;
	p = rot2(time * -0.33) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.17, vec3(0.52, 0.59, 0.57), vec3(0.32, 0.44, 0.31), vec3(1.02, 1.08, 1.34), vec3(0.91, 0.18, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
