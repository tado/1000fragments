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
	p *= 1.71;
	vec3 col = vec3(0.042, 0.021, 0.073);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.64 + 2.82) + vec2(time * -0.39, time * -0.59) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.62;
		float pd = length(gv - off);
		float tw = 0.78 + 0.29 * sin(time * 3.24 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.47, 0.33, 0.36), vec3(0.30, 0.93, 0.77), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
