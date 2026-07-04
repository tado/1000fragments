uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.035, 0.038, 0.031);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.06 + 4.69) + vec2(fl * 7.31, -time * 1.14 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.50;
		float pd = length((gv - off) * vec2(8.85, 1.0));
		float tw = 0.62 + 0.30 * sin(time * 5.40 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.43, 0.66, 0.80), vec3(0.73, 0.45, 0.83), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
