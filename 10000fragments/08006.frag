uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.37 - t * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -2.59 + time * 0.61) * p;
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.75 - time * 0.63); }
	p = rot2(time * -0.57) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.08, vec3(0.41, 0.53, 0.42), vec3(0.31, 0.34, 0.36), vec3(0.73, 1.14, 1.15), vec3(0.58, 0.25, 0.53));
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
