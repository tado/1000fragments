uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.69 - t * 1.50 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.05) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 2.05 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	{ p = vec2(atan(p.y, p.x) * 1.64, length(p) * 2.61 - time * 0.49); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.52);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.89 + time * 0.10, vec3(0.58, 0.48, 0.41), vec3(0.46, 0.45, 0.40), vec3(1.07, 0.82, 0.72), vec3(0.45, 0.26, 0.14));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
