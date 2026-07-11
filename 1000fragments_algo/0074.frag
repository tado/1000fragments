uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.83) * 0.52), cos((time * 0.83) * 1.03)) * 0.13;
	p *= 1.60;
	p *= 0.90;
	vec2 gp = p * 2.95;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.40 + rnd * 6.2831853 + (time * 0.83) * 6.15);
	vec3 col = vec3(0.48, 0.48, 0.46) * (0.09 / (abs((v)) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 1.001, 0.997) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
