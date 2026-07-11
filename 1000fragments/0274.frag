uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.75 + vec2(t * 1.11, -t * 1.11) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.51 - t * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.16;
	p = rot2(length(p) * 2.63 + time * 0.38) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.91 + time * 0.11, vec3(0.51, 0.46, 0.58), vec3(0.41, 0.35, 0.35), vec3(1.22, 1.38, 1.16), vec3(0.88, 0.44, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
