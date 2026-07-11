uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.xz = rot2(time * 0.96) * q.xz;
	q.xy = rot2(time * 0.73) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.18, q.y);
	return length(w) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 1.45));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = hue(tt * 0.15 + time * 0.17) * fog;
	col += vec3(0.22, 0.74, 0.65) * (it / 50.0) * 0.71;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
