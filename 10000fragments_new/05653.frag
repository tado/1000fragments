uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.86;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.28 - 0.14 * sin(time * 5.58 + rnd * 6.2831853)) * 23.78);
	vec3 col = palette(v * 0.55 + time * 0.26, vec3(0.46, 0.43, 0.50), vec3(0.47, 0.38, 0.46), vec3(0.99, 0.98, 1.28), vec3(0.60, 0.41, 0.08));
	col *= 0.63 + 0.47 * hash21(id + 11.0);
	col *= 0.85 + 0.20 * sin(gl_FragCoord.y * 1.86 + time * 15.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
