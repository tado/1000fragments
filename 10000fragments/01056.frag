uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	vec3 col = vec3(0.003, 0.037, 0.074);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.91 + 2.89) + vec2(time * -0.12, time * -0.39) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.63;
		float pd = length(gv - off);
		float tw = 0.79 + 0.17 * sin(time * 2.90 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.57, 0.25, 0.47), vec3(0.93, 0.90, 0.26), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col *= 0.87 + 0.20 * sin(gl_FragCoord.y * 1.92 + time * 10.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
