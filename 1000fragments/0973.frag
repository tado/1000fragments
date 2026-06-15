uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.16 + vec2(t * 2.84, -t * 2.84) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	p = fract(p * 1.77) - 0.5;
	p = rot2(1.62) * p;
	p += vec2(0.33, 0.74) * sin(length(p) * 3.11 - time * 1.54) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.07, vec3(0.50, 0.42, 0.54), vec3(0.49, 0.47, 0.48), vec3(1.22, 0.91, 1.03), vec3(0.20, 0.13, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
