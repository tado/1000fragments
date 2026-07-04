uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.76;
	vec3 mq = mod(q, 2.21) - 1.10;
	return length(mq) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.34));
	rd.xy = rot2(time * -0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.30 + time * 0.21, vec3(0.47, 0.57, 0.47), vec3(0.41, 0.40, 0.30), vec3(0.88, 1.14, 0.99), vec3(0.85, 0.52, 0.45)) * fog;
	col += vec3(0.26, 0.53, 0.96) * (it / 62.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
