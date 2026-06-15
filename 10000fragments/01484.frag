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
    v = sin(sa * 9.23 + sr * 19.28 - t * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.27;
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 5.89 - time * 0.38); }
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	p = rot2(p.y * -3.89 + time * 0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.00, vec3(0.55, 0.52, 0.49), vec3(0.44, 0.31, 0.42), vec3(0.72, 1.36, 1.30), vec3(0.88, 0.68, 0.67));
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
