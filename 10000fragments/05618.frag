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
    v = sin(sa * 4.86 + sr * 8.19 - t * 0.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = rot2(p.y * 1.17 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.20 + time * 0.08, vec3(0.43, 0.40, 0.46), vec3(0.32, 0.50, 0.49), vec3(1.40, 1.22, 1.36), vec3(0.45, 0.73, 0.18));
	col = fract(col * 1.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
