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
	p *= 1.58;
	vec2 gp = p * 2.44;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.03 - time * 4.98 + rnd * 6.2831853);
	vec3 col = palette(v * 1.08 + time * 0.26, vec3(0.51, 0.44, 0.40), vec3(0.36, 0.43, 0.32), vec3(1.04, 0.95, 1.02), vec3(0.77, 0.59, 0.04));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
