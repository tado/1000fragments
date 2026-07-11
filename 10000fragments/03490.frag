uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.74) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.97 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	{ p = vec2(atan(p.y, p.x) * 1.08, length(p) * 5.98 - time * 0.54); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.02, vec3(0.40, 0.41, 0.50), vec3(0.32, 0.39, 0.33), vec3(1.20, 0.88, 1.14), vec3(0.68, 0.46, 0.62));
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
