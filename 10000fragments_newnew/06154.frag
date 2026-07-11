uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.047, 0.001, 0.007);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.59 + 2.84) + vec2(time * -0.50, time * 0.26) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.84;
		float pd = length(gv - off);
		float tw = 0.82 + 0.22 * sin(time * 5.50 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.74, 0.91, 0.47), vec3(0.59, 0.67, 0.41), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = mod(col * 1.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
