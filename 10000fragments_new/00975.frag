uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.59) * q.xz;
	q.xy = rot2(time * 0.43) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.81, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.25);
	vec3 rd = normalize(vec3(p, 1.04));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.25 + time * 0.06, vec3(0.53, 0.42, 0.44), vec3(0.36, 0.30, 0.36), vec3(1.15, 0.90, 1.11), vec3(0.57, 0.18, 0.09)) * fog;
	col += vec3(0.85, 0.31, 0.75) * (it / 54.0) * 0.75;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
