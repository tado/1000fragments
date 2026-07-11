uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.39 + t * 1.87 + ph) * 0.7;
    float wb = sin(p.y * 16.45 - t * 0.92 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.78;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.94 + t * 3.91 + ph) + sin(p.y * 10.29 - t * 3.91 + ph)
        + sin((p.x + p.y) * 4.36 + t * 3.91 + ph) + sin(length(p) * 12.22 - t * 3.91 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.70 + time * 0.21, vec3(0.50, 0.59, 0.59), vec3(0.36, 0.43, 0.40), vec3(1.10, 1.37, 1.37), vec3(0.91, 0.92, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
