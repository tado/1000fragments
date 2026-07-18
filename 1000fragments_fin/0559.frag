uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.36;
	p = rot2(2.31) * p;
	vec2 q = p * 2.18 + vec2(5.67, 1.89);
	q += (time * 0.78) * vec2(0.05, -0.06);
	float lv = 1.0;
	vec2 id = floor(q);
	for(int mi = 0; mi < 3; mi++){
		if(hash21(id * 0.731 + 7.67) > 0.73) break;
		q *= 2.0; lv *= 2.0;
		id = floor(q);
	}
	vec2 gv = fract(q) - 0.5;
	float h = hash21(id * 1.171 + 7.25);
	float ftn = 0.5 + 0.5 * sin((time * 0.78) * 0.79 + h * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * ((ftn * 2.0 - 1.0))) * vec3(0.45, 0.44, 0.49) + vec3(0.09, 0.06, 0.11);
	float bd = max(abs(gv.x), abs(gv.y));
	float edge = smoothstep(0.431, 0.446, bd);
	col = mix(col, vec3(0.03, 0.01, 0.06), edge * 0.87);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.978, 1.017, 0.943);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
