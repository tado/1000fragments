uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.37) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 1.34 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.35 + sin(p.y * 4.00 + t * 2.49) * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 5.48 - time * 0.37); }
	p *= 2.06;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.66 + time * 0.03, vec3(0.55, 0.44, 0.47), vec3(0.32, 0.39, 0.40), vec3(0.94, 1.14, 1.25), vec3(0.49, 0.60, 0.68));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
