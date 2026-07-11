uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.82;
	float g = dot(sin(q * 3.00), cos(q.zxy * 3.00));
	return (abs(g) - 0.61) / (3.00 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.75);
	vec3 rd = normalize(vec3(p, 1.45));
	rd.xy = rot2(time * 0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.33 + time * 0.08, vec3(0.41, 0.58, 0.47), vec3(0.48, 0.44, 0.33), vec3(1.06, 1.22, 1.08), vec3(0.36, 0.49, 0.64)) * fog;
	col += vec3(0.70, 0.26, 0.80) * (it / 72.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
