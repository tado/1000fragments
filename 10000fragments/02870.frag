uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.49 + sin(p.y * 4.86 + t * 3.86) * 1.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.61) * p;
	p += vec2(-0.30, -0.92) * sin(length(p) * 2.81 - time * 1.23) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.26, vec3(0.45, 0.53, 0.46), vec3(0.38, 0.47, 0.48), vec3(0.80, 0.75, 0.71), vec3(0.21, 0.17, 0.59));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
