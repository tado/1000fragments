uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.94 + vec2(t * 0.47, -t * 0.47) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.72;
	p += vec2(-0.75, 0.44) * sin(length(p) * 2.48 - time * 1.44) * 0.16;
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	p = rot2(0.98) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.03, vec3(0.54, 0.57, 0.41), vec3(0.31, 0.35, 0.35), vec3(1.16, 0.98, 0.90), vec3(0.38, 0.44, 0.06));
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
