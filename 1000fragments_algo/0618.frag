uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.56) * 0.75), cos((time * 0.56) * 1.04)) * 0.23;
	p.x += p.y * 0.77;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	vec3 col = vec3(0.049, 0.016, 0.054);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.74 + 3.17) + vec2(fl * 7.31, -(time * 0.56) * 2.07 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.51;
		float pd = length((gv - off) * vec2(4.82, 1.0));
		float tw = 0.80 + 0.29 * sin((time * 0.56) * 1.94 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.51, 0.66, 0.97), vec3(0.86, 0.22, 0.88), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col *= 0.84 + 0.17 * sin(gl_FragCoord.y * 2.76 + (time * 0.56) * 4.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 0.999, 0.917) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
