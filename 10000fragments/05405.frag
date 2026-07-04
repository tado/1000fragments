uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.30;
	vec3 mq = mod(q, 2.37) - 1.18;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * 0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.18 + time * 0.36, vec3(0.41, 0.57, 0.42), vec3(0.37, 0.48, 0.41), vec3(1.12, 1.01, 0.74), vec3(0.04, 0.96, 0.40)) * fog;
	col += vec3(0.77, 0.70, 0.27) * (it / 72.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
