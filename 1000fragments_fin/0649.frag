uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	vec3 col = mix(vec3(0.066, 0.047, 0.065), vec3(0.066, 0.032, 0.070), clamp(0.5 + p.y * -0.10 + p.x * -0.25, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = rot2((time * 0.82) * -0.12 * fl) * p * (fl * 1.94 + 3.13) + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.66;
		float pd = length(gv - off);
		float tw = 0.77 + 0.20 * sin((time * 0.82) * 4.31 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.40, 0.55, 0.30), vec3(0.87, 0.28, 0.81), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.932, 0.980, 1.040);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
