uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.34 + t * 4.12 + ph) + sin(p.y * 10.18 - t * 2.66 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.90, length(p) * 4.98 - time * 0.50); }
	p = rot2(time * -1.38) * p;
	p = rot2(length(p) * 2.33 + time * 0.92) * p;
	p *= 1.60;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.14, vec3(0.56, 0.46, 0.50), vec3(0.38, 0.38, 0.31), vec3(1.01, 0.85, 1.04), vec3(0.33, 0.49, 0.47));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
