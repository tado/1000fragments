uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	vec3 col = vec3(0.048, 0.015, 0.007);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.93 + 3.63) + vec2(time * 0.27, time * -0.12) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.60;
		float pd = length(gv - off);
		float tw = 0.74 + 0.17 * sin(time * 4.75 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.38, 0.36, 0.70), vec3(0.52, 0.93, 0.31), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
