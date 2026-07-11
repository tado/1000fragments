uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.64;
	vec3 mq = mod(q, 1.75) - 0.88;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.88, 0.88, -3.0);
	vec3 rd = normalize(vec3(p, 1.76));
	rd.xy = rot2(time * 0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.31 + time * 0.34, vec3(0.44, 0.54, 0.57), vec3(0.44, 0.30, 0.42), vec3(1.06, 1.29, 0.97), vec3(0.86, 0.31, 0.56)) * fog;
	col += vec3(0.35, 0.64, 0.55) * (it / 58.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
