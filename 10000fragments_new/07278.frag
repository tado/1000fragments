uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.75;
	vec3 mq = mod(q, 1.63) - 0.82;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.82, 0.82, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2(time * 0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.32 + time * 0.18, vec3(0.58, 0.59, 0.55), vec3(0.37, 0.44, 0.33), vec3(1.05, 0.99, 0.75), vec3(0.58, 0.34, 0.86)) * fog;
	col += vec3(0.84, 0.63, 0.96) * (it / 70.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
