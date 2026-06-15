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
    v = sin(sa * 11.30 + sr * 20.28 - t * 4.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.41;
	p += vec2(0.44, 0.15) * sin(length(p) * 5.19 - time * 1.06) * 0.18;
	p = rot2(time * -0.46) * p;
	p = rot2(length(p) * -2.07 + time * 1.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.04, vec3(0.46, 0.46, 0.44), vec3(0.32, 0.41, 0.30), vec3(1.08, 1.01, 1.03), vec3(0.48, 0.43, 0.60));
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
