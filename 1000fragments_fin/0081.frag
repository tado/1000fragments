uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x = abs(p.x) - 0.39;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.73) * -1.05) * p;
	vec2 gp = p * 4.46;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 23.02 - (time * 0.73) * 7.90 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.148, 0.083, 0.050), vec3(0.615, 0.862, 0.971), cc);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.023, 0.955, 1.014);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
