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
	p *= 2.32;
	vec3 col = vec3(0.041, 0.005, 0.017);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.59 + 3.97) + vec2(time * -0.41, time * 0.23) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.58;
		float pd = length(gv - off);
		float tw = 0.69 + 0.36 * sin(time * 4.27 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.88, 0.82, 0.35), vec3(0.43, 0.85, 0.43), hash21(id + 7.0));
		col += tint * smoothstep(0.13, 0.0, pd) * tw / fl;
	}
	col = fract(col * 2.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
