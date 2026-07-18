uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p += vec2(sin((time * 0.77) * 0.97), cos((time * 0.77) * 1.13)) * 0.17;
	vec3 col = mix(vec3(0.061, 0.050, 0.053), vec3(0.047, 0.069, 0.058), clamp(0.5 + p.y * 0.64 + p.x * 0.15, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.05 + 4.56) + vec2(fl * 7.31, -(time * 0.77) * 3.29 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.83;
		float pd = length((gv - off) * vec2(6.93, 1.0));
		float tw = 0.77 + 0.30 * sin((time * 0.77) * 5.35 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.57, 0.64, 0.78), vec3(0.53, 0.44, 0.80), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.041, 1.001, 0.938);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
