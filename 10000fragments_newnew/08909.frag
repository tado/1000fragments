uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 2.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 24.34 - time * 7.87 + rnd * 6.2831853);
	vec3 col = palette(v * 0.58 + time * 0.23, vec3(0.49, 0.57, 0.43), vec3(0.35, 0.40, 0.30), vec3(0.88, 0.84, 1.39), vec3(0.67, 0.00, 0.75));
	col *= 0.61 + 0.32 * hash21(id + 11.0);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.39 + time * 5.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
