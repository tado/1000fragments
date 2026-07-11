uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.53) * q.xz;
	q.xy = rot2(time * 0.61) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.34, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * 0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.27 + time * 0.39, vec3(0.50, 0.42, 0.48), vec3(0.35, 0.40, 0.33), vec3(1.14, 1.38, 1.35), vec3(0.54, 0.06, 0.50)) * fog;
	col += vec3(0.76, 0.42, 0.55) * (it / 60.0) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
