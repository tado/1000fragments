uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.63 + (time * 0.88) * 0.74) * 0.14;
	p.x *= resolution.x / resolution.y;
	vec3 col = mix(vec3(0.066, 0.048, 0.041), vec3(0.103, 0.025, 0.068), clamp(0.5 + p.y * -0.11 + p.x * 0.03, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.90 + 5.92) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.84;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin((time * 0.88) * 7.82 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.55, 0.40, 0.35), vec3(0.71, 0.37, 0.61), hash21(id + 7.0));
		col += tint * smoothstep(0.13, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.019, 0.972, 1.015);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
