uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p += vec2(sin((time * 0.83) * 0.52), cos((time * 0.83) * 0.39)) * 0.24;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	vec3 col = vec3(0.012, 0.045, 0.054);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.46 + 3.59) + vec2((time * 0.83) * -0.39, (time * 0.83) * 0.51) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.73;
		float pd = length(gv - off);
		float tw = 0.67 + 0.36 * sin((time * 0.83) * 3.63 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.96, 0.90, 0.76), vec3(0.38, 0.59, 0.52), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(0.921, 0.976, 1.026) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
