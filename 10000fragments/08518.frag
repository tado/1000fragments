uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.49 + vec2(t * 2.01, -t * 2.01) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.45, t * 1.99 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	{ p = vec2(atan(p.y, p.x) * 2.54, length(p) * 3.08 - time * 0.76); }
	p *= 3.16;
	p = rot2(time * -0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = d1 * d2;
	vec3 col = palette(d * 0.70 + time * 0.20, vec3(0.40, 0.42, 0.57), vec3(0.44, 0.40, 0.35), vec3(0.79, 0.71, 0.79), vec3(0.43, 0.71, 0.79));
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
