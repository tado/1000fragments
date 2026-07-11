uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.45;
	vec3 mq = mod(q, 1.94) - 0.97;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.97, 0.97, -3.0);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2(time * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.13 + time * 0.10) * fog;
	col += vec3(0.67, 0.62, 0.81) * (it / 66.0) * 0.76;
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 2.26 + time * 5.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
