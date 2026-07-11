uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.71 + sin(p.y * 4.89 + t * 5.19) * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	p = rot2(length(p) * -1.80 + time * 0.93) * p;
	p = rot2(p.y * 1.31 + time * 1.00) * p;
	p = rot2(3.03) * p;
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 4.59 - time * 0.28); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.29, vec3(0.52, 0.53, 0.43), vec3(0.46, 0.49, 0.45), vec3(0.72, 0.71, 0.79), vec3(0.04, 0.86, 0.46));
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
