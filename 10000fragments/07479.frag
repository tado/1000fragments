uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.82) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 1.22 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	{ p = vec2(atan(p.y, p.x) * 1.39, length(p) * 3.49 - time * 0.12); }
	p = rot2(length(p) * -3.41 + time * 0.36) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.24, vec3(0.50, 0.45, 0.46), vec3(0.45, 0.34, 0.44), vec3(0.79, 1.30, 0.73), vec3(0.24, 0.77, 0.05));
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
