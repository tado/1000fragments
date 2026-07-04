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
	p *= 1.48;
	vec2 gp = p * 7.72;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 27.78 - time * 7.12 + rnd * 6.2831853);
	vec3 col = palette(v * 0.70 + time * 0.32, vec3(0.49, 0.41, 0.56), vec3(0.35, 0.46, 0.48), vec3(1.12, 0.86, 1.11), vec3(0.72, 0.15, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
