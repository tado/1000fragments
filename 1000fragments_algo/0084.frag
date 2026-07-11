uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.99;
	p.x *= resolution.x / resolution.y;
	p *= 2.50;
	vec2 gp = p * 6.44;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.15 - 0.16 * sin((time * 0.57) * 4.46 + rnd * 6.2831853)) * 12.35);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.15, 0.14), vec3(0.68, 0.69, 0.74), cc);
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 1.32 + (time * 0.57) * 11.09);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 1.017, 0.982) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
