uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.xz = rot2(time * 1.18) * q.xz;
	q.xy = rot2(time * 0.77) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.08, q.y);
	return length(w) - 0.24;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.76);
	vec3 rd = normalize(vec3(p, 1.39));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = hue(tt * 0.14 + time * 0.19) * fog;
	col += vec3(0.94, 0.69, 0.24) * (it / 52.0) * 0.38;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
