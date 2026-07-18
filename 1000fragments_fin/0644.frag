uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.58;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	vec3 col = mix(vec3(0.069, 0.051, 0.032), vec3(0.045, 0.043, 0.026), clamp(0.5 + p.y * -0.25 + p.x * -0.24, 0.0, 1.0));
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.83 + 2.46) + vec2((time * 0.72) * 0.59, (time * 0.72) * -0.40) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.59;
		float pd = length(gv - off);
		float tw = 0.80 + 0.35 * sin((time * 0.72) * 5.52 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.64, 0.63, 0.54), vec3(0.22, 0.96, 0.90), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.51));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.924, 0.991, 1.041);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
