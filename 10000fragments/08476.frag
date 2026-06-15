uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.12 * cos(sa * 6 + t * 2.39 + ph);
    v = sin((sr - petal) * 9.60);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.63, length(p) * 5.90 - time * 0.28); }
	p += vec2(0.84, 0.14) * sin(length(p) * 5.79 - time * 1.18) * 0.29;
	p = rot2(length(p) * 1.13 + time * 0.40) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.18, 0.74, 1.52) + vec3(0.25, 0.13, 0.23);
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
