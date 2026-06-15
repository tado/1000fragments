uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.61 + t * 1.95 + ph) + sin(p.y * 4.55 - t * 1.95 + ph)
        + sin((p.x + p.y) * 5.07 + t * 1.95 + ph) + sin(length(p) * 6.95 - t * 1.95 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.50, t * 0.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	p = fract(p * 2.27) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = d1 * d2;
	vec3 col = palette(d * 0.94 + time * 0.13, vec3(0.49, 0.57, 0.42), vec3(0.48, 0.38, 0.40), vec3(0.84, 1.04, 1.21), vec3(0.92, 0.66, 0.72));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
