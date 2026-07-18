uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2((time * 0.87) * 0.64) * p;
	vec2 gp = p * 2.28;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float ad = min(abs(length(gv - vec2(0.5)) - 0.5), abs(length(gv + vec2(0.5)) - 0.5));
	float v = sin(ad * 16.62 - (time * 0.87) * 5.96 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.47, 0.42, 0.44) + vec3(0.05, 0.06, 0.09);
	col *= 0.61 + 0.33 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.932, 0.997, 1.050);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
