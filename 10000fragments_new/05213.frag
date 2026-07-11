uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	vec2 gp = p * 6.53;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 25.77 - time * 2.59 + rnd * 6.2831853);
	vec3 col = palette(v * 1.13 + time * 0.26, vec3(0.49, 0.46, 0.52), vec3(0.45, 0.38, 0.33), vec3(0.77, 1.16, 1.21), vec3(0.96, 0.74, 0.51));
	col *= 0.64 + 0.49 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
