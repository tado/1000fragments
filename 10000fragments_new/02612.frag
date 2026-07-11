uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.60) * q.xz;
	q.xy = rot2(time * 0.77) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.05, q.y);
	return length(w) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.83);
	vec3 rd = normalize(vec3(p, 1.38));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.17 + time * 0.33, vec3(0.48, 0.55, 0.41), vec3(0.33, 0.30, 0.32), vec3(0.92, 0.83, 1.37), vec3(0.71, 0.97, 0.52)) * fog;
	col += vec3(0.46, 0.42, 0.67) * (it / 66.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
