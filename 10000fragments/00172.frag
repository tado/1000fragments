uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.92 + t * 2.50 + ph) + sin(p.y * 11.63 - t * 2.50 + ph)
        + sin((p.x + p.y) * 3.97 + t * 2.50 + ph) + sin(length(p) * 14.18 - t * 2.50 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.29 + vec2(t * 1.92, -t * 1.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.16, vec3(0.48, 0.48, 0.46), vec3(0.41, 0.43, 0.34), vec3(0.70, 1.01, 0.89), vec3(0.62, 0.68, 0.63));
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
