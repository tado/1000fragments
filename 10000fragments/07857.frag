uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.13 + sin(p.y * 1.08 + t * 5.37) * 2.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.16 - t * 6.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.93);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.85 + time * 0.26, vec3(0.45, 0.58, 0.54), vec3(0.43, 0.37, 0.37), vec3(0.72, 1.38, 1.35), vec3(0.53, 0.44, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
