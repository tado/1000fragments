uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.23 * cos(sa * 4 + t * 0.95 + ph);
    v = sin((sr - petal) * 10.77);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	p = rot2(2.06) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.03, vec3(0.44, 0.55, 0.40), vec3(0.34, 0.36, 0.44), vec3(1.15, 1.17, 1.11), vec3(0.36, 0.61, 0.52));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
