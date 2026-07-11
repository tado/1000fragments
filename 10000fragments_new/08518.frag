uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.68;
	vec3 mq = mod(q, 1.94) - 0.97;
	mq.xy = rot2(time * 1.57) * mq.xy;
	vec3 b = abs(mq) - vec3(0.20);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.97, 0.97, -3.0);
	vec3 rd = normalize(vec3(p, 1.33));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.24 + time * 0.24, vec3(0.54, 0.50, 0.55), vec3(0.31, 0.35, 0.37), vec3(1.05, 0.92, 1.20), vec3(0.74, 0.07, 0.70)) * fog;
	col += vec3(0.60, 0.64, 0.46) * (it / 72.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
