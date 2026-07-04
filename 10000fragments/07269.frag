uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.xz = rot2(time * 1.00) * q.xz;
	q.xy = rot2(time * 0.66) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.07, q.y);
	return length(w) - 0.18;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.67);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * 0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = hue(tt * 0.25 + time * 0.10) * fog;
	col += vec3(0.79, 0.43, 0.93) * (it / 63.0) * 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
