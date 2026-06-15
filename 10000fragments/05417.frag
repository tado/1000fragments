uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.51) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.12 + t * 2.51 + ph) + sin(p.y * 5.17 - t * 2.51 + ph)
        + sin((p.x + p.y) * 2.41 + t * 2.51 + ph) + sin(length(p) * 15.25 - t * 2.51 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.10) - 0.5;
	p = abs(p) - 0.34;
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 3.27 - time * 0.18); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.40 + time * 0.02, vec3(0.52, 0.41, 0.42), vec3(0.42, 0.39, 0.36), vec3(1.10, 0.77, 1.16), vec3(0.36, 0.96, 0.80));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
