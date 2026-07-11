uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.10 + vec2(t * 1.93, -t * 2.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.60 + t * 2.07 + ph) + sin(p.y * 6.22 - t * 2.07 + ph)
        + sin((p.x + p.y) * 6.52 + t * 2.07 + ph) + sin(length(p) * 5.57 - t * 2.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	p = rot2(p.y * -1.65 + time * 0.95) * p;
	p = rot2(time * -1.36) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.42, 0.57, 0.41), vec3(0.38, 0.31, 0.46), vec3(1.32, 0.99, 0.87), vec3(0.09, 0.21, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
