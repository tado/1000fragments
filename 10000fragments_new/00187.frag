uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	vec2 gp = p * 6.92;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 15.37 - time * 7.21 + rnd * 6.2831853);
	vec3 col = palette(v * 0.42 + time * 0.24, vec3(0.51, 0.45, 0.46), vec3(0.44, 0.43, 0.43), vec3(0.91, 0.90, 0.95), vec3(0.92, 0.06, 0.18));
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 1.01 + time * 9.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
