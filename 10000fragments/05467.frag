uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.041, 0.011);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.86 + 4.26) + vec2(fl * 7.31, -time * 3.18 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.53;
		float pd = length((gv - off) * vec2(6.42, 1.0));
		float tw = 0.83 + 0.35 * sin(time * 4.80 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.42, 0.84, 0.53), vec3(0.54, 0.99, 0.70), hash21(id + 7.0));
		col += tint * smoothstep(0.13, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
