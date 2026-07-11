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
	p *= 1.04;
	p *= 2.49;
	vec2 gp = p * 5.17;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 15.77 + rnd * 6.2831853 + (time * 0.80) * 2.22);
	vec3 col = palette((v) * 0.55 + (time * 0.80) * 0.05, vec3(0.26, 0.32, 0.21), vec3(0.18, 0.23, 0.26), vec3(0.87, 0.44, 0.59), vec3(0.08, 0.44, 0.01));
	col *= 0.88 + 0.11 * sin(gl_FragCoord.y * 2.08 + (time * 0.80) * 8.84);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.936, 0.988, 1.027) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
