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
	p *= 1.27;
	vec3 col = vec3(0.017, 0.013, 0.004);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.82 + 3.24) + vec2(time * -0.27, time * -0.40) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.82;
		float pd = length(gv - off);
		float tw = 0.76 + 0.24 * sin(time * 1.92 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.25, 0.44, 0.23), vec3(0.96, 0.74, 0.29), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
