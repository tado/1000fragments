uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.70 + vec2(t * 1.14, -t * 1.14) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.18 + time * 0.90) * p;
	{ p = vec2(atan(p.y, p.x) * 2.07, length(p) * 3.74 - time * 0.23); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.19, vec3(0.42, 0.48, 0.40), vec3(0.39, 0.37, 0.35), vec3(0.80, 1.32, 1.15), vec3(0.81, 0.39, 0.16));
	col = fract(col * 1.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
