uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.41;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	vec3 col = vec3(0.039, 0.047, 0.077);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.22 + 1.56) + vec2((time * 0.65) * 0.12, (time * 0.65) * 0.25) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.88;
		float pd = length(gv - off);
		float tw = 0.78 + 0.20 * sin((time * 0.65) * 5.75 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.45, 0.21, 0.34), vec3(0.46, 0.21, 0.85), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.033, 0.984, 0.961);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
