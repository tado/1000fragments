uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.41;
	vec2 gp = p * 7.42;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.09 * sin(time * 1.85 + rnd * 6.2831853)) * 21.86);
	vec3 col = palette(v * 0.71 + time * 0.02, vec3(0.52, 0.51, 0.46), vec3(0.31, 0.31, 0.37), vec3(1.19, 0.78, 1.04), vec3(0.52, 0.53, 0.95));
	col *= 0.58 + 0.36 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
