uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.04;
	vec3 mq = mod(q, 1.98) - 0.99;
	mq.xy = rot2(time * 1.02) * mq.xy;
	vec3 b = abs(mq) - vec3(0.24);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.52));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = hue(tt * 0.13 + time * 0.23) * fog;
	col += vec3(0.77, 0.82, 0.38) * (it / 63.0) * 0.40;
	col *= 0.83 + 0.16 * sin(gl_FragCoord.y * 1.22 + time * 8.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
