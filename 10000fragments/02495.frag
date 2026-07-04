uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	vec2 gp = p * 7.83;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 13.09 - time * 5.00 + rnd * 6.2831853);
	vec3 col = palette(v * 1.36 + time * 0.38, vec3(0.58, 0.41, 0.50), vec3(0.41, 0.49, 0.45), vec3(0.79, 0.77, 1.38), vec3(0.49, 0.37, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
