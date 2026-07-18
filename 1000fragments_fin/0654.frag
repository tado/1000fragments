uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = mix(vec3(0.029, 0.055, 0.073), vec3(0.026, 0.086, 0.050), clamp(0.5 + p.y * 0.39 + p.x * -0.04, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.63) * 0.25 * fl) * p * (fl * 1.66 + 1.70) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length(gv - off);
		float tw = 0.77 + 0.39 * sin((time * 0.63) * 2.89 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.53, 0.60, 0.59), vec3(0.26, 0.53, 0.67), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.052, 1.003, 0.939);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
