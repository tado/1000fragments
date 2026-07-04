uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	vec2 gp = p * 4.53;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 12.42 - time * 5.22 + rnd * 6.2831853);
	vec3 col = palette(v * 1.38 + time * 0.15, vec3(0.40, 0.57, 0.49), vec3(0.35, 0.35, 0.37), vec3(1.09, 1.06, 1.07), vec3(0.34, 0.12, 0.37));
	col *= 0.50 + 0.38 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
