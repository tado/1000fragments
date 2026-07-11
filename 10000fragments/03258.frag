uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.36 + t * 4.67 + ph) + sin(p.y * 8.62 - t * 4.05 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.69) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.98);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.70 + time * 0.02, vec3(0.56, 0.41, 0.47), vec3(0.41, 0.30, 0.36), vec3(1.09, 1.31, 1.21), vec3(0.50, 0.85, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
