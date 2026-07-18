uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.85) * 0.59), cos((time * 0.85) * 1.11)) * 0.25;
	p = rot2((time * 0.85) * 1.15) * p;
	vec2 gp = p * 2.18;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 11.72 + rnd * 6.2831853 + (time * 0.85) * 2.32);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.026, 0.089, 0.094), vec3(0.136, 0.609, 0.456), smoothstep(0.0, 0.42, cc)), vec3(0.968, 0.943, 0.898), smoothstep(0.42, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.923, 0.974, 1.035);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
