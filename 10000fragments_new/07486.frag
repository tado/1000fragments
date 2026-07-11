uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.78;
	vec3 mq = mod(q, 1.75) - 0.87;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.87, 0.87, -3.0);
	vec3 rd = normalize(vec3(p, 1.11));
	rd.xy = rot2(time * 0.34) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.26 + time * 0.12, vec3(0.58, 0.46, 0.59), vec3(0.44, 0.47, 0.42), vec3(0.80, 1.22, 0.80), vec3(0.38, 0.72, 0.77)) * fog;
	col += vec3(0.74, 0.86, 0.93) * (it / 67.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
