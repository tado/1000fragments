uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 22.23 - t * 1.79 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 35.53 - t * 1.79 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.29;
	p = rot2(length(p) * 1.65 + time * 0.72) * p;
	p = rot2(p.y * -1.68 + time * 0.65) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.80 + time * 0.34); }
	p += vec2(-0.66, -0.32) * sin(length(p) * 2.51 - time * 1.47) * 0.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.28, vec3(0.47, 0.46, 0.47), vec3(0.30, 0.30, 0.40), vec3(1.30, 0.78, 1.11), vec3(0.23, 0.88, 0.26));
	col = fract(col * 2.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
