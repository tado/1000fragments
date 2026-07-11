uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec3 col = vec3(0.019, 0.022, 0.047);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.13 + 3.25) + vec2(fl * 7.31, -time * 1.41 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.84;
		float pd = length((gv - off) * vec2(4.42, 1.0));
		float tw = 0.71 + 0.39 * sin(time * 1.77 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.65, 0.62, 0.52), vec3(0.44, 0.46, 0.63), hash21(id + 7.0));
		col += tint * smoothstep(0.12, 0.0, pd) * tw / fl;
	}
	col *= 0.89 + 0.20 * sin(gl_FragCoord.y * 2.24 + time * 5.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
