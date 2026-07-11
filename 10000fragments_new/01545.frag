uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.09;
	float g = dot(sin(q * 2.28), cos(q.zxy * 2.28));
	return (abs(g) - 0.31) / (2.28 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 0.98));
	rd.xy = rot2(time * 0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = hue(tt * 0.20 + time * 0.26) * fog;
	col += vec3(0.49, 0.29, 0.61) * (it / 66.0) * 0.99;
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 2.91 + time * 15.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
