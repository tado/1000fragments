uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.87;
	vec3 mq = mod(q, 2.11) - 1.05;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	rd.xy = rot2(time * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.29 + time * 0.38, vec3(0.41, 0.52, 0.54), vec3(0.36, 0.47, 0.32), vec3(0.82, 0.95, 1.08), vec3(0.32, 0.20, 0.06)) * fog;
	col += vec3(0.56, 1.00, 0.81) * (it / 70.0) * 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
