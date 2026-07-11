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
	p *= 2.35;
	vec2 gp = p * 5.23;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 23.43 - time * 6.10 + rnd * 6.2831853);
	vec3 col = palette(v * 1.20 + time * 0.39, vec3(0.56, 0.46, 0.55), vec3(0.38, 0.31, 0.30), vec3(0.74, 1.22, 1.24), vec3(0.45, 0.57, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
