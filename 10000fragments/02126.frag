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
    v = sin(sa * 4.47 + sr * 12.36 - t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	p = abs(p) - 0.77;
	p = rot2(1.88) * p;
	p += vec2(0.09, 0.35) * sin(length(p) * 4.24 - time * 0.53) * 0.37;
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 2.74 - time * 0.34); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.07, vec3(0.55, 0.43, 0.49), vec3(0.46, 0.33, 0.43), vec3(0.96, 1.16, 1.20), vec3(0.17, 0.35, 0.49));
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
