uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.009, 0.013, 0.008);
	for(int pl = 0; pl < 3; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.37 + 2.26) + vec2(time * -0.17, time * -0.11) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.81;
		float pd = length(gv - off);
		float tw = 0.64 + 0.36 * sin(time * 2.47 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.23, 0.48, 0.46), vec3(0.89, 0.32, 0.74), hash21(id + 7.0));
		col += tint * smoothstep(0.17, 0.0, pd) * tw / fl;
	}
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 1.73 + time * 17.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
