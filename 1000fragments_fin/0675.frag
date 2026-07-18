uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.57 + (time * 0.60) * 1.06) * 0.09;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	vec3 col = mix(vec3(0.034, 0.052, 0.044), vec3(0.027, 0.036, 0.077), clamp(0.5 + p.y * 0.43 + p.x * 0.27, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.05 + 2.22) + vec2((time * 0.60) * 0.56, (time * 0.60) * 0.13) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.75;
		float pd = length(gv - off);
		float tw = 0.72 + 0.20 * sin((time * 0.60) * 2.21 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.74, 0.23, 0.81), vec3(0.82, 0.96, 0.79), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.008, 0.952, 1.000);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
