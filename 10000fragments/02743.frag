uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 7.67;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 19.69 - time * 4.92 + rnd * 6.2831853);
	vec3 col = palette(v * 1.48 + time * 0.15, vec3(0.54, 0.52, 0.54), vec3(0.33, 0.41, 0.47), vec3(0.79, 1.21, 1.10), vec3(0.48, 0.54, 0.55));
	col *= 0.67 + 0.43 * hash21(id + 11.0);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.29 + time * 7.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
