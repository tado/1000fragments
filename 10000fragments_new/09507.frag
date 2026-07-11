uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	vec3 col = vec3(0.047, 0.026, 0.072);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.32 + 2.89) + vec2(fl * 7.31, -time * 1.46 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.89;
		float pd = length((gv - off) * vec2(7.88, 1.0));
		float tw = 0.62 + 0.40 * sin(time * 5.12 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.57, 0.64, 0.29), vec3(0.91, 0.68, 0.32), hash21(id + 7.0));
		col += tint * smoothstep(0.07, 0.0, pd) * tw / fl;
	}
	col *= 0.82 + 0.10 * sin(gl_FragCoord.y * 2.60 + time * 8.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
