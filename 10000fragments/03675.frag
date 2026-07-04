uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 21.11 - time * 5.75 + rnd * 6.2831853);
	vec3 col = palette(v * 0.96 + time * 0.17, vec3(0.40, 0.47, 0.57), vec3(0.41, 0.30, 0.31), vec3(1.20, 1.01, 1.21), vec3(0.17, 0.77, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
