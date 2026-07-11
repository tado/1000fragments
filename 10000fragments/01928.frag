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
    v = sin(sa * 8.28 + sr * 21.14 - t * 3.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 5.34 - time * 0.49); }
	p = rot2(0.71) * p;
	p = rot2(p.y * 2.63 + time * 0.51) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.59 + time * 0.15, vec3(0.55, 0.46, 0.56), vec3(0.41, 0.35, 0.32), vec3(1.03, 1.08, 1.20), vec3(0.33, 0.76, 0.42));
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
