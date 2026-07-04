uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	vec2 gp = p * 3.44;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.20 - time * 2.56 + rnd * 6.2831853);
	vec3 col = palette(v * 1.36 + time * 0.20, vec3(0.59, 0.58, 0.50), vec3(0.49, 0.40, 0.49), vec3(0.76, 1.40, 1.05), vec3(0.13, 0.57, 0.28));
	col *= 0.51 + 0.43 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
