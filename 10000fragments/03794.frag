uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.41 + vec2(t * 0.57, -t * 0.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.34;
	{ p = vec2(atan(p.y, p.x) * 1.91, length(p) * 5.33 - time * 0.64); }
	p = rot2(1.70) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.00 + time * 0.06, vec3(0.55, 0.55, 0.49), vec3(0.46, 0.47, 0.38), vec3(0.96, 0.95, 0.84), vec3(0.06, 0.89, 0.74));
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
