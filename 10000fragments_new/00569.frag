uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.62;
	vec3 mq = mod(q, 1.79) - 0.89;
	return length(mq) - 0.33;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.89, 0.89, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2(time * -0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.20 + time * 0.39, vec3(0.57, 0.46, 0.56), vec3(0.40, 0.34, 0.42), vec3(1.07, 0.78, 1.25), vec3(0.90, 0.54, 0.69)) * fog;
	col += vec3(0.46, 0.30, 0.81) * (it / 66.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
