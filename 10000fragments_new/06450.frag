uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.17;
	vec2 gp = p * 3.11;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.72 - time * 2.65 + rnd * 6.2831853);
	vec3 col = palette(v * 1.21 + time * 0.05, vec3(0.55, 0.58, 0.57), vec3(0.33, 0.41, 0.30), vec3(0.96, 0.79, 1.30), vec3(0.22, 0.08, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
