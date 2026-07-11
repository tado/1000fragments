uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.44) * q.xz;
	q.xy = rot2(time * 0.95) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.31, q.y);
	return length(w) - 0.19;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.00);
	vec3 rd = normalize(vec3(p, 1.69));
	rd.xy = rot2(time * 0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.81;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.36 + time * 0.07, vec3(0.51, 0.54, 0.53), vec3(0.40, 0.46, 0.36), vec3(1.04, 1.36, 0.97), vec3(0.68, 0.97, 0.97)) * fog;
	col += vec3(0.94, 0.80, 0.43) * (it / 57.0) * 0.42;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
