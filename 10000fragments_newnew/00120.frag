uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.16) * q.xz;
	q.xy = rot2(time * 1.10) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.90, q.y);
	return length(w) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.23 + time * 0.21, vec3(0.56, 0.60, 0.53), vec3(0.50, 0.40, 0.33), vec3(0.92, 1.27, 0.83), vec3(0.65, 0.29, 0.23)) * fog;
	col += vec3(0.83, 0.36, 0.47) * (it / 61.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
