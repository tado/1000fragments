uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.22) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 1.09 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.64;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.04, vec3(0.51, 0.51, 0.57), vec3(0.47, 0.40, 0.48), vec3(1.14, 1.15, 1.03), vec3(0.88, 0.08, 0.66));
	col *= 0.85 + 0.13 * sin(gl_FragCoord.y * 1.67 + time * 13.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
