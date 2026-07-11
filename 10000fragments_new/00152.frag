uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.81) * q.xz;
	q.xy = rot2(time * 1.17) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.95, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.54);
	vec3 rd = normalize(vec3(p, 1.47));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.31 + time * 0.30, vec3(0.40, 0.56, 0.46), vec3(0.45, 0.34, 0.41), vec3(1.17, 0.96, 0.74), vec3(0.81, 0.78, 0.97)) * fog;
	col += vec3(0.40, 0.43, 0.57) * (it / 67.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
