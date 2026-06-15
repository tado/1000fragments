uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.45 + vec2(t * 2.53, -t * 2.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.65;
	p = rot2(1.64) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.25, vec3(0.45, 0.51, 0.55), vec3(0.47, 0.46, 0.33), vec3(1.01, 1.10, 0.77), vec3(0.48, 0.11, 0.33));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
