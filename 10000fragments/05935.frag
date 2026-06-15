uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.33 + t * 4.27 + ph) + sin(p.y * 7.35 - t * 4.27 + ph)
        + sin((p.x + p.y) * 9.70 + t * 4.27 + ph) + sin(length(p) * 14.47 - t * 4.27 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.47 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.87);
	float d = d1 * d2;
	vec3 col = palette(d * 0.72 + time * 0.17, vec3(0.47, 0.46, 0.56), vec3(0.44, 0.43, 0.35), vec3(0.92, 0.80, 0.85), vec3(0.94, 0.78, 0.41));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
