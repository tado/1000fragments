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
    v = sin(sa * 2.37 + sr * 5.57 - t * 3.32 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.81;
	p = rot2(p.y * 2.92 + time * 0.76) * p;
	{ p = vec2(atan(p.y, p.x) * 2.14, length(p) * 2.68 - time * 0.71); }
	p += vec2(-0.22, -0.03) * sin(length(p) * 4.82 - time * 0.68) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.75 + time * 0.29, vec3(0.46, 0.47, 0.55), vec3(0.35, 0.30, 0.49), vec3(1.06, 1.34, 1.00), vec3(0.34, 0.18, 0.60));
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
