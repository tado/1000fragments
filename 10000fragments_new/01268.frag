uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec2 gp = p * 2.32;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 29.09 - time * 6.17 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.14, 0.36), vec3(0.76, 0.99, 0.80), cc);
	col *= 0.69 + 0.45 * hash21(id + 11.0);
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.54 + time * 12.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
