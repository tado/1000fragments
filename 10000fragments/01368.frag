uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.03 + t * 2.23 + ph) + sin(p.y * 3.21 - t * 2.23 + ph)
        + sin((p.x + p.y) * 7.33 + t * 2.23 + ph) + sin(length(p) * 6.80 - t * 2.23 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.50 + t * 5.84 + ph) + sin(p.y * 8.31 - t * 1.79 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.97 + time * 0.26, vec3(0.55, 0.44, 0.51), vec3(0.38, 0.34, 0.50), vec3(1.13, 0.84, 0.99), vec3(0.91, 0.28, 0.17));
	col = mod(col * 2.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
