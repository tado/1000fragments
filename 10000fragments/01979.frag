uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.86 - t * 6.71 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.85 + sr * 15.21 - t * 3.95 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	p += vec2(-0.32, -0.15) * sin(length(p) * 3.20 - time * 1.59) * 0.16;
	p = fract(p * 1.01) - 0.5;
	p = rot2(time * 0.79) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.67);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.29, vec3(0.44, 0.48, 0.44), vec3(0.42, 0.45, 0.47), vec3(1.08, 0.90, 0.92), vec3(0.10, 0.77, 0.56));
	col = fract(col * 2.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
