uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	vec3 col = vec3(0.015, 0.016, 0.007);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 2.21 + 3.88) + fl * 7.31;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.83;
		float pd = length(gv - off);
		float tw = 0.5 + 0.5 * sin((time * 0.51) * 8.12 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.81, 0.24, 0.66), vec3(0.27, 0.67, 0.55), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.956, 1.026) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
