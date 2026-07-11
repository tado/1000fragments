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
	p *= 1.97;
	vec2 gp = p * 3.67;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 19.74 - time * 7.16 + rnd * 6.2831853);
	vec3 col = palette(v * 0.47 + time * 0.19, vec3(0.48, 0.46, 0.52), vec3(0.34, 0.46, 0.38), vec3(0.97, 0.76, 0.89), vec3(0.30, 0.88, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
