uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.02 + t * 3.43 + ph) + sin(p.y * 2.50 - t * 3.43 + ph)
        + sin((p.x + p.y) * 10.78 + t * 3.43 + ph) + sin(length(p) * 10.80 - t * 3.43 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.23 + vec2(t * 1.62, -t * 1.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.26, vec3(0.50, 0.59, 0.55), vec3(0.48, 0.45, 0.46), vec3(1.31, 1.30, 0.94), vec3(0.93, 0.24, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
