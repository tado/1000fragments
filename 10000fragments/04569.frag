uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 29.23 - t * 5.80 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 9.53 - t * 5.80 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	p += vec2(-0.24, 0.79) * sin(length(p) * 4.52 - time * 1.03) * 0.31;
	p = rot2(2.02) * p;
	p = abs(p) - 0.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.17, lr * 2.42 + time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.30, vec3(0.58, 0.44, 0.48), vec3(0.33, 0.34, 0.41), vec3(0.86, 0.97, 0.78), vec3(0.27, 0.99, 0.67));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
