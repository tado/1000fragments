uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	vec3 col = vec3(0.028, 0.011, 0.062);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.08 + 2.95) + vec2(fl * 7.31, -time * 2.18 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.63;
		float pd = length((gv - off) * vec2(6.51, 1.0));
		float tw = 0.61 + 0.32 * sin(time * 4.38 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.28, 0.42, 0.33), vec3(0.54, 0.50, 0.32), hash21(id + 7.0));
		col += tint * smoothstep(0.09, 0.0, pd) * tw / fl;
	}
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 1.67 + time * 8.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
