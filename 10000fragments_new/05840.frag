uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.71;
	vec3 col = vec3(0.032, 0.006, 0.007);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.08 + 3.49) + vec2(time * 0.23, time * -0.47) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.89;
		float pd = length(gv - off);
		float tw = 0.79 + 0.40 * sin(time * 2.79 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.27, 0.89, 0.78), vec3(0.77, 0.40, 0.57), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 2.32 + time * 7.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
