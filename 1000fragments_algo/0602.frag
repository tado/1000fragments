uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.51) * 0.50), cos((time * 0.51) * 0.94)) * 0.20;
	p *= 1.81;
	vec3 col = vec3(0.020, 0.019, 0.067);
	for(int pl = 0; pl < 2; pl++){
		float fl = float(pl) + 1.0;
		vec2 q = p * (fl * 1.70 + 3.50) + vec2((time * 0.51) * -0.57, (time * 0.51) * 0.30) * fl + fl * 3.7;
		vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
		vec2 off = (hash22(id) - 0.5) * 0.71;
		float pd = length(gv - off);
		float tw = 0.73 + 0.23 * sin((time * 0.51) * 2.31 + hash21(id) * 6.2831853);
		vec3 tint = mix(vec3(0.56, 0.72, 0.65), vec3(0.39, 0.72, 0.47), hash21(id + 7.0));
		col += tint * smoothstep(0.10, 0.0, pd) * tw / fl;
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.51)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.928, 0.960, 1.032) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
