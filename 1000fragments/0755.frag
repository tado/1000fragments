uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.91 + vec2(t * 2.63, -t * 2.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.48 + t * 5.94 + ph) + sin(p.y * 8.94 - t * 1.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p = rot2(2.46) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.28, vec3(0.55, 0.48, 0.55), vec3(0.47, 0.38, 0.38), vec3(1.04, 1.03, 1.31), vec3(0.54, 0.65, 0.28));
	col = fract(col * 1.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
