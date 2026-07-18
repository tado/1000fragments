uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.57;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	vec2 gp = p * 4.58;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.46 + rnd * 6.2831853 + (time * 0.63) * 5.94);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.017, 0.031, 0.069), vec3(0.252, 0.308, 0.752), smoothstep(0.0, 0.58, cc)), vec3(0.638, 0.934, 1.000), smoothstep(0.58, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.96));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.041, 1.004, 0.916);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
