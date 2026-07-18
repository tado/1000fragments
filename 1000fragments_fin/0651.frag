uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.65 + (time * 0.82) * 1.01) * 0.19;
	p.x += p.y * -0.28;
	p *= 2.17;
	vec3 col = mix(vec3(0.050, 0.043, 0.100), vec3(0.026, 0.031, 0.099), clamp(0.5 + p.y * -0.03 + p.x * -0.19, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.80 + 2.43) + vec2(fl * 7.31, -(time * 0.82) * 2.50 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length((gv - off) * vec2(8.18, 1.0));
		float tw = 0.76 + 0.36 * sin((time * 0.82) * 4.42 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.76, 0.83, 0.74), vec3(0.49, 0.38, 0.75), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.027, 0.971, 0.947);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
