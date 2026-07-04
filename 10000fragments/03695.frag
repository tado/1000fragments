uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.49) * q.xz;
	q.xy = rot2(time * 0.62) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.90, q.y);
	return length(w) - 0.23;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.39 + time * 0.15, vec3(0.46, 0.57, 0.43), vec3(0.43, 0.49, 0.31), vec3(1.11, 1.32, 1.09), vec3(0.09, 0.67, 0.82)) * fog;
	col += vec3(0.28, 0.21, 0.75) * (it / 52.0) * 0.91;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
