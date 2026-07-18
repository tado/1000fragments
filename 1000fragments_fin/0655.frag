uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.64 + (time * 0.79) * 0.79) * 0.06;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	vec3 col = mix(vec3(0.063, 0.036, 0.064), vec3(0.104, 0.027, 0.033), clamp(0.5 + p.y * -0.51 + p.x * 0.01, 0.0, 1.0));
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.40 + 5.15) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.54;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin((time * 0.79) * 6.16 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.37, 0.42, 0.52), vec3(0.40, 0.55, 0.68), hash21(id + 7.0));
		col += tint * smoothstep(0.13, 0.0, pd) * tw / fl;
	}
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.003, 0.994, 1.004);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
