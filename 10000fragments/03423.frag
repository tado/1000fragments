uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.89) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.89 - t * 8.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.91 + time * 0.23, vec3(0.47, 0.49, 0.55), vec3(0.31, 0.42, 0.44), vec3(1.04, 0.83, 0.72), vec3(0.98, 0.73, 0.27));
	col = mod(col * 1.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
