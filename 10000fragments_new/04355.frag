uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	vec3 col = vec3(0.006, 0.041, 0.063);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.32 + 4.12) + vec2(fl * 7.31, -time * 1.54 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.68;
		float pd = length((gv - off) * vec2(6.20, 1.0));
		float tw = 0.65 + 0.26 * sin(time * 5.99 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.54, 0.48, 0.92), vec3(0.82, 0.27, 0.29), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.71 + time * 17.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
