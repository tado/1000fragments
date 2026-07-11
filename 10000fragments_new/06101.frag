uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.54;
	float g = dot(sin(q * 1.89), cos(q.zxy * 1.89));
	return (abs(g) - 0.30) / (1.89 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = hue(tt * 0.17 + time * 0.08) * fog;
	col += vec3(0.65, 0.45, 0.85) * (it / 68.0) * 0.75;
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 2.90 + time * 15.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
