uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	vec2 gp = p * 7.54;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.18 * sin(time * 5.12 + rnd * 6.2831853)) * 19.19);
	vec3 col = palette(v * 0.52 + time * 0.19, vec3(0.53, 0.50, 0.58), vec3(0.34, 0.33, 0.46), vec3(0.89, 0.74, 1.18), vec3(0.32, 0.50, 0.42));
	col *= 0.70 + 0.35 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
