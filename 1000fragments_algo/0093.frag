uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	vec2 gp = p * 5.42;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.34 - (time * 0.55) * 5.02 + rnd * 6.2831853);
	vec3 col = palette((v) * 1.18 + (time * 0.55) * 0.00, vec3(0.38, 0.43, 0.39), vec3(0.24, 0.24, 0.26), vec3(0.59, 0.72, 0.81), vec3(0.80, 0.19, 0.19));
	col *= 0.67 + 0.31 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.84));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.994, 0.915) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
