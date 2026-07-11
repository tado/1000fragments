uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.x += p.y * -0.63;
	vec2 gp = p * 3.74;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 11.25 + rnd * 6.2831853 + (time * 0.83) * 6.31);
	vec3 col = palette((v) * 1.08 + (time * 0.83) * 0.19, vec3(0.27, 0.36, 0.32), vec3(0.24, 0.22, 0.30), vec3(0.61, 0.68, 0.71), vec3(0.20, 0.86, 0.32));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 0.995, 1.007) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
