uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.22;
	vec3 mq = mod(q, 2.03) - 1.01;
	return length(mq) - 0.26;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.18 + time * 0.25, vec3(0.52, 0.49, 0.42), vec3(0.48, 0.39, 0.40), vec3(1.09, 1.30, 1.02), vec3(0.46, 0.18, 0.55)) * fog;
	col += vec3(0.27, 0.85, 0.74) * (it / 59.0) * 0.83;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
