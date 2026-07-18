uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p.x += p.y * -0.52;
	p *= 2.17;
	vec3 col = vec3(0.032, 0.034, 0.050);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.75 + 2.24) + vec2((time * 0.88) * -0.52, (time * 0.88) * 0.55) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.68;
		float pd = length(gv - off);
		float tw = 0.76 + 0.38 * sin((time * 0.88) * 4.35 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.47, 0.51, 0.42), vec3(0.57, 0.45, 0.93), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.969, 1.011, 0.947);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
