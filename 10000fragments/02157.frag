uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.35 - t * 5.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.39 + t * 2.74 + ph) + sin(p.y * 11.70 - t * 2.74 + ph)
        + sin((p.x + p.y) * 2.25 + t * 2.74 + ph) + sin(length(p) * 3.71 - t * 2.74 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p += vec2(-0.32, -0.92) * sin(length(p) * 2.66 - time * 1.62) * 0.12;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.07, vec3(0.57, 0.47, 0.49), vec3(0.42, 0.43, 0.34), vec3(1.02, 0.80, 1.30), vec3(0.33, 0.98, 0.95));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
