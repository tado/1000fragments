uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	vec3 mq = mod(q, 2.44) - 1.22;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.12 + time * 0.23, vec3(0.46, 0.57, 0.52), vec3(0.39, 0.48, 0.32), vec3(1.26, 1.24, 0.90), vec3(0.89, 0.05, 0.15)) * fog;
	col += vec3(0.51, 0.29, 0.81) * (it / 68.0) * 0.40;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
