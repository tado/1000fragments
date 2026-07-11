uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	vec3 col = vec3(0.003, 0.033, 0.027);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.93 + 4.63) + vec2(fl * 7.31, -time * 2.55 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.80;
		float pd = length((gv - off) * vec2(4.14, 1.0));
		float tw = 0.76 + 0.32 * sin(time * 5.76 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.63, 0.44, 0.55), vec3(0.50, 0.91, 0.85), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
