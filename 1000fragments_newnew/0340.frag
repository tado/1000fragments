uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.56) * 0.67;
	float g = dot(sin(q * 1.89), cos(q.zxy * 1.89));
	return (abs(g) - 0.56) / (1.89 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.40));
	rd.xy = rot2((time * 0.56) * 0.39) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.21 + (time * 0.56) * 0.34, vec3(0.23, 0.25, 0.32), vec3(0.21, 0.25, 0.17), vec3(0.71, 0.71, 0.45), vec3(0.75, 0.34, 0.58)) * fog;
	col += vec3(0.83, 0.36, 0.51) * (it / 50.0) * 0.94;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(1.038, 1.002, 0.916) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
