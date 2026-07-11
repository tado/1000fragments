uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.53;
	p.y += sin(p.x * 1.29 + (time * 0.77) * 0.69) * 0.10;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	vec3 col = vec3(0.033, 0.014, 0.001);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.24 + 2.88) + vec2((time * 0.77) * -0.33, (time * 0.77) * 0.48) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.61;
		float pd = length(gv - off);
		float tw = 0.80 + 0.16 * sin((time * 0.77) * 4.41 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.51, 0.29, 0.39), vec3(0.43, 0.78, 0.51), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.961, 1.047) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
