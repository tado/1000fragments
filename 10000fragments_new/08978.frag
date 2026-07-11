uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.xz = rot2(time * 1.41) * q.xz;
	q.xy = rot2(time * 0.96) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.96, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.72);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2(time * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = hue(tt * 0.27 + time * 0.20) * fog;
	col += vec3(0.20, 0.43, 0.48) * (it / 58.0) * 0.65;
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
