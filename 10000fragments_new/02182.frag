uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 7.04;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 23.23 - time * 6.46 + rnd * 6.2831853);
	vec3 col = palette(v * 0.64 + time * 0.06, vec3(0.41, 0.46, 0.54), vec3(0.48, 0.36, 0.34), vec3(1.06, 1.23, 0.87), vec3(0.19, 0.99, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
