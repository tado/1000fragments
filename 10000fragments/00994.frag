uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.32) * p;
	vec2 gp = p * 2.81;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.90 - time * 2.07 + rnd * 6.2831853);
	vec3 col = palette(v * 0.46 + time * 0.14, vec3(0.58, 0.49, 0.49), vec3(0.32, 0.47, 0.48), vec3(1.36, 0.91, 0.89), vec3(0.37, 0.17, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
