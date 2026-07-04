uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec3 col = vec3(0.010, 0.041, 0.062);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.87 + 2.26) + vec2(fl * 7.31, -time * 2.73 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.69;
		float pd = length((gv - off) * vec2(8.87, 1.0));
		float tw = 0.83 + 0.26 * sin(time * 4.72 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.87, 0.24, 0.24), vec3(0.96, 0.59, 0.67), hash21(id + 7.0));
		col += tint * smoothstep(0.11, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
