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
    v = sin(sa * 5.67 + sr * 19.18 - t * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.47;
	p = rot2(2.25) * p;
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 2.41 - time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.08, vec3(0.45, 0.51, 0.49), vec3(0.32, 0.38, 0.41), vec3(1.23, 1.14, 0.91), vec3(0.15, 0.80, 0.65));
	col = fract(col * 1.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
