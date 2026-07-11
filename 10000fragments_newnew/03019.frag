uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.36;
	vec3 mq = mod(q, 2.10) - 1.05;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.06));
	rd.xy = rot2(time * 0.26) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.35 + time * 0.04, vec3(0.56, 0.57, 0.52), vec3(0.50, 0.35, 0.48), vec3(0.77, 1.06, 1.37), vec3(0.06, 0.81, 0.34)) * fog;
	col += vec3(0.40, 0.80, 0.39) * (it / 66.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
