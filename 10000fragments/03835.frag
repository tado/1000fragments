uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec3 col = vec3(0.007, 0.048, 0.006);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.90 + 3.05) + vec2(fl * 7.31, -time * 3.07 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.57;
		float pd = length((gv - off) * vec2(5.71, 1.0));
		float tw = 0.73 + 0.20 * sin(time * 5.80 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.94, 0.80, 0.68), vec3(0.99, 0.24, 0.52), hash21(id + 7.0));
		col += tint * smoothstep(0.16, 0.0, pd) * tw / fl;
	}
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
