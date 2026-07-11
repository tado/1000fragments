uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 gp = p * 6.01;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.14 - time * 6.41 + rnd * 6.2831853);
	vec3 col = palette(v * 0.74 + time * 0.22, vec3(0.52, 0.42, 0.41), vec3(0.43, 0.32, 0.45), vec3(1.25, 1.09, 1.10), vec3(0.46, 0.39, 0.70));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
