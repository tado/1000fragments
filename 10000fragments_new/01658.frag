uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.80;
	vec2 gp = p * 6.69;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.55 - time * 7.25 + rnd * 6.2831853);
	vec3 col = palette(v * 1.03 + time * 0.25, vec3(0.52, 0.45, 0.52), vec3(0.44, 0.41, 0.46), vec3(1.21, 0.72, 1.10), vec3(0.97, 0.03, 0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
