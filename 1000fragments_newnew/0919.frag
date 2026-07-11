uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.65;
	vec2 gp = p * 4.03;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 13.83 - (time * 0.61) * 5.36 + rnd * 6.2831853);
	vec3 col = palette((v) * 0.55 + (time * 0.61) * 0.02, vec3(0.31, 0.29, 0.27), vec3(0.16, 0.17, 0.15), vec3(0.75, 0.57, 0.51), vec3(0.84, 0.29, 0.26));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.967, 1.006, 0.933) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
