uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.88, t * 2.49 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.29 + sr * 5.34 - t * 0.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	p = rot2(p.y * -1.82 + time * 0.97) * p;
	p = rot2(time * -0.95) * p;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.24, length(p) * 2.01 - time * 0.19); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.62);
	float d = d1 * d2;
	vec3 col = palette(d * 1.21 + time * 0.16, vec3(0.44, 0.42, 0.40), vec3(0.38, 0.32, 0.40), vec3(1.17, 0.94, 0.75), vec3(0.50, 0.81, 0.26));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
