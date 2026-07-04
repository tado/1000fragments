uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 6.10;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 10.55 - time * 6.91 + rnd * 6.2831853);
	vec3 col = palette(v * 1.16 + time * 0.23, vec3(0.42, 0.59, 0.54), vec3(0.31, 0.48, 0.42), vec3(0.91, 0.85, 1.08), vec3(0.32, 0.65, 0.49));
	col *= 0.58 + 0.40 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
