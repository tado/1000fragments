uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.13;
	vec3 mq = mod(q, 2.19) - 1.10;
	return length(mq) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2(time * -0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.34 + time * 0.03, vec3(0.56, 0.48, 0.55), vec3(0.46, 0.37, 0.42), vec3(1.21, 0.82, 1.21), vec3(1.00, 0.74, 0.23)) * fog;
	col += vec3(0.27, 0.78, 0.99) * (it / 62.0) * 0.85;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
