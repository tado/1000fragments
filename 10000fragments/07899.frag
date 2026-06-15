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
    v = sin(sa * 10.10 + sr * 10.15 - t * 3.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.06 + sin(p.y * 2.63 + t * 4.17) * 4.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -1.84 + time * 0.14) * p;
	p = rot2(length(p) * 1.31 + time * 0.87) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.62 + time * 0.04, vec3(0.59, 0.51, 0.57), vec3(0.46, 0.48, 0.36), vec3(0.77, 1.25, 0.79), vec3(0.82, 0.93, 0.29));
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
