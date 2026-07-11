uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.80 - t * 2.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.80;
	p = rot2(length(p) * 3.28 + time * 0.91) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 2.58 + time * -0.35); }
	p = rot2(0.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.23, vec3(0.57, 0.55, 0.49), vec3(0.46, 0.33, 0.38), vec3(0.86, 1.01, 1.25), vec3(0.56, 0.68, 0.85));
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
