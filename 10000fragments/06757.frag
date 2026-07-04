uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	vec3 col = vec3(0.007, 0.031, 0.016);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.41 + 2.63) + vec2(fl * 7.31, -time * 1.97 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.53;
		float pd = length((gv - off) * vec2(5.49, 1.0));
		float tw = 0.80 + 0.36 * sin(time * 5.86 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.28, 0.96, 0.99), vec3(0.65, 0.89, 0.44), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
