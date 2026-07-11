uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	vec3 mq = mod(q, 2.76) - 1.38;
	mq.xy = rot2(time * -1.44) * mq.xy;
	vec3 b = abs(mq) - vec3(0.31);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.38, 1.38, -3.0);
	vec3 rd = normalize(vec3(p, 1.04));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.20 + time * 0.13, vec3(0.41, 0.51, 0.51), vec3(0.35, 0.43, 0.42), vec3(1.23, 1.38, 1.25), vec3(0.51, 0.16, 0.48)) * fog;
	col += vec3(0.50, 0.81, 0.57) * (it / 60.0) * 0.49;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
