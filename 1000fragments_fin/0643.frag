uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.54 + (time * 0.57) * 1.46) * 0.10;
	p += vec2(sin((time * 0.57) * 0.91), cos((time * 0.57) * 1.08)) * 0.20;
	vec3 col = mix(vec3(0.017, 0.053, 0.074), vec3(0.008, 0.058, 0.089), clamp(0.5 + p.y * 0.34 + p.x * -0.30, 0.0, 1.0));
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.86 + 2.69) + vec2((time * 0.57) * 0.41, (time * 0.57) * 0.35) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length(gv - off);
		float tw = 0.64 + 0.15 * sin((time * 0.57) * 3.06 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.76, 0.75, 0.92), vec3(0.25, 0.86, 0.53), hash21(id + 7.0));
		col += tint * smoothstep(0.08, 0.0, pd) * tw / fl;
	}
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.64 + (time * 0.57) * 7.63);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.964, 1.015, 0.945);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
