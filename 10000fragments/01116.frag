uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.64 + t * 2.20 + ph) + sin(p.y * 4.06 - t * 2.20 + ph)
        + sin((p.x + p.y) * 3.20 + t * 2.20 + ph) + sin(length(p) * 11.22 - t * 2.20 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.49 + t * 2.57 + ph) + sin(p.y * 4.57 - t * 2.57 + ph)
        + sin((p.x + p.y) * 5.70 + t * 2.57 + ph) + sin(length(p) * 4.52 - t * 2.57 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.29);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.54 + time * 0.20, vec3(0.49, 0.46, 0.47), vec3(0.35, 0.39, 0.44), vec3(1.34, 0.72, 1.08), vec3(0.55, 0.15, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
