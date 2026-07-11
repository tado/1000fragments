uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	vec3 col = vec3(0.012, 0.010, 0.070);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.49 + 1.74) + vec2(time * -0.56, time * -0.39) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.70;
		float pd = length(gv - off);
		float tw = 0.72 + 0.38 * sin(time * 4.07 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.98, 0.67, 0.47), vec3(0.21, 0.58, 0.28), hash21(id + 7.0));
		col += tint * smoothstep(0.14, 0.0, pd) * tw / fl;
	}
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 1.18 + time * 5.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
