uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.49) * q.xz;
	q.xy = rot2(time * 0.60) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.93, q.y);
	return length(w) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.50);
	vec3 rd = normalize(vec3(p, 1.09));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.21 + time * 0.18, vec3(0.54, 0.50, 0.44), vec3(0.45, 0.44, 0.38), vec3(0.72, 1.13, 1.26), vec3(0.86, 0.75, 0.84)) * fog;
	col += vec3(0.34, 0.92, 0.37) * (it / 62.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
