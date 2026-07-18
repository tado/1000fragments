uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.81) * 0.79), cos((time * 0.81) * 0.62)) * 0.19;
	vec3 col = mix(vec3(0.039, 0.029, 0.068), vec3(0.020, 0.022, 0.081), clamp(0.5 + p.y * -0.25 + p.x * 0.22, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.67 + 3.17) + vec2((time * 0.81) * -0.31, (time * 0.81) * -0.10) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.77;
		float pd = length(gv - off);
		float tw = 0.64 + 0.36 * sin((time * 0.81) * 5.79 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.29, 0.21, 0.84), vec3(0.96, 0.39, 0.33), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.999, 0.999, 1.009);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
