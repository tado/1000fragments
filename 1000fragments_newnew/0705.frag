uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.43;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.20 + rnd * 6.2831853 + (time * 0.77) * 2.96);
	vec3 col = vec3(0.66, 0.67, 0.53) * (0.11 / (abs((v)) + 0.04));
	col = col / (1.0 + col);
	col *= 0.55 + 0.37 * hash21(id + 11.0);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.940, 0.979, 1.027) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
