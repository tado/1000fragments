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
    v = sin(sa * 11.67 + sr * 4.41 - t * 0.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.81) - 0.5;
	p = rot2(p.y * 1.04 + time * 0.28) * p;
	p += vec2(0.05, 0.96) * sin(length(p) * 5.27 - time * 0.52) * 0.25;
	p = abs(p) - 0.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.46 + time * 0.14, vec3(0.57, 0.43, 0.42), vec3(0.38, 0.38, 0.33), vec3(1.37, 0.88, 0.81), vec3(0.46, 0.06, 0.08));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
