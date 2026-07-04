uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.027, 0.011, 0.070);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.71 + 2.65) + vec2(fl * 7.31, -time * 2.53 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.76;
		float pd = length((gv - off) * vec2(6.13, 1.0));
		float tw = 0.72 + 0.37 * sin(time * 4.65 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.44, 0.37, 0.32), vec3(0.65, 0.66, 0.33), hash21(id + 7.0));
		col += tint * smoothstep(0.15, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
