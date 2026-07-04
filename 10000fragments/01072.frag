uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.35) * q.xz;
	q.xy = rot2(time * 0.76) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.93, q.y);
	return length(w) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.24);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.37 + time * 0.03, vec3(0.51, 0.50, 0.46), vec3(0.33, 0.42, 0.41), vec3(1.14, 0.97, 0.76), vec3(0.40, 0.98, 0.51)) * fog;
	col += vec3(0.59, 0.84, 0.24) * (it / 56.0) * 0.96;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
