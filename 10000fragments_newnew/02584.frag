uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	vec3 col = vec3(0.041, 0.023, 0.058);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.05 + 4.46) + vec2(fl * 7.31, -time * 2.70 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.86;
		float pd = length((gv - off) * vec2(5.94, 1.0));
		float tw = 0.84 + 0.34 * sin(time * 4.04 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.50, 0.69, 0.36), vec3(0.28, 0.57, 0.57), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.62 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
