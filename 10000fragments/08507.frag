uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	vec2 gp = p * 2.16;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 13.93 - time * 7.94 + rnd * 6.2831853);
	vec3 col = palette(v * 0.47 + time * 0.03, vec3(0.42, 0.47, 0.52), vec3(0.38, 0.37, 0.34), vec3(1.07, 0.74, 1.37), vec3(0.27, 0.20, 0.76));
	col *= 0.55 + 0.41 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
