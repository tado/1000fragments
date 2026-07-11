uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.010, 0.008, 0.079);
	for(int pl = 0; pl < 4; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 0.85 + 2.07) + vec2(fl * 7.31, -time * 1.72 * fl);
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.87;
		float pd = length((gv - off) * vec2(7.91, 1.0));
		float tw = 0.66 + 0.30 * sin(time * 3.23 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.70, 0.20, 0.99), vec3(0.56, 0.51, 0.56), hash21(id + 7.0));
		col += tint * smoothstep(0.06, 0.0, pd) * tw / fl;
	}
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
