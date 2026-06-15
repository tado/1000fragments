uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.45 + sin(p.y * 1.98 + t * 1.50) * 2.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.21) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 1.30 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.84, length(p) * 5.31 - time * 0.53); }
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	p = abs(p) - 0.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.17);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.81 + time * 0.06, vec3(0.50, 0.58, 0.48), vec3(0.35, 0.43, 0.34), vec3(1.34, 1.09, 0.82), vec3(0.06, 0.38, 0.31));
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
