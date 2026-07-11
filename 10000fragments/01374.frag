uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.87 - t * 8.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p = rot2(p.y * 2.24 + time * 0.26) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.25, lr * 1.88 + time * 0.10); }
	p += vec2(-0.07, 0.15) * sin(length(p) * 4.61 - time * 0.73) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.79 + time * 0.20, vec3(0.45, 0.56, 0.43), vec3(0.41, 0.49, 0.47), vec3(0.98, 0.87, 1.04), vec3(0.46, 0.13, 0.62));
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
