uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.31 + t * 3.81 + ph) + sin(p.y * 3.73 - t * 3.81 + ph)
        + sin((p.x + p.y) * 2.70 + t * 3.81 + ph) + sin(length(p) * 15.18 - t * 3.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.53 + t * 0.78 + ph) + sin(p.y * 9.33 - t * 0.78 + ph)
        + sin((p.x + p.y) * 11.90 + t * 0.78 + ph) + sin(length(p) * 13.67 - t * 0.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.54 + time * 0.27, vec3(0.49, 0.55, 0.49), vec3(0.33, 0.39, 0.35), vec3(1.03, 1.39, 0.80), vec3(0.22, 0.48, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
