uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.74) * q.xz;
	q.xy = rot2(time * 1.02) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.97, q.y);
	return length(w) - 0.22;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.26);
	vec3 rd = normalize(vec3(p, 1.38));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.40 + time * 0.11, vec3(0.50, 0.44, 0.47), vec3(0.45, 0.33, 0.42), vec3(0.71, 1.34, 1.33), vec3(0.08, 0.80, 0.04)) * fog;
	col += vec3(0.38, 0.35, 0.49) * (it / 65.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
