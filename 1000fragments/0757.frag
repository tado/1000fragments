uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.37 + vec2(t * 1.48, -t * 1.48) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.62 + time * 0.69) * p;
	p = rot2(0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.22, vec3(0.56, 0.55, 0.41), vec3(0.47, 0.47, 0.34), vec3(1.22, 0.96, 1.05), vec3(0.69, 0.19, 0.14));
	col = fract(col * 2.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
