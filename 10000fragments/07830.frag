uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	vec2 gp = p * 4.54;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.17 * sin(time * 1.52 + rnd * 6.2831853)) * 20.42);
	vec3 col = palette(v * 1.34 + time * 0.17, vec3(0.59, 0.58, 0.46), vec3(0.43, 0.48, 0.32), vec3(0.98, 1.16, 1.02), vec3(0.07, 0.33, 0.60));
	col *= 0.69 + 0.32 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
