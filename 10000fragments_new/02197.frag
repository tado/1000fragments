uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.01;
	vec3 mq = mod(q, 2.49) - 1.25;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 0.91));
	rd.xy = rot2(time * -0.12) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.20 + time * 0.31, vec3(0.48, 0.46, 0.49), vec3(0.45, 0.49, 0.40), vec3(0.72, 1.33, 1.16), vec3(0.40, 0.21, 0.85)) * fog;
	col += vec3(0.58, 0.54, 0.61) * (it / 68.0) * 0.65;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
