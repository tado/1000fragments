uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.37 + sin(p.y * 2.89 + t * 1.77) * 2.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 2.18 - time * 0.76); }
	p = fract(p * 1.31) - 0.5;
	p = rot2(p.y * 2.27 + time * 0.47) * p;
	p = rot2(3.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.12, vec3(0.52, 0.50, 0.41), vec3(0.34, 0.31, 0.32), vec3(0.94, 1.20, 0.73), vec3(0.69, 0.65, 0.01));
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
