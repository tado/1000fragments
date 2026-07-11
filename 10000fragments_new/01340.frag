uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.79;
	float g = dot(sin(q * 1.81), cos(q.zxy * 1.81));
	return (abs(g) - 0.75) / (1.81 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.09);
	vec3 rd = normalize(vec3(p, 1.32));
	rd.xy = rot2(time * 0.40) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.25 + time * 0.31, vec3(0.52, 0.50, 0.45), vec3(0.33, 0.40, 0.35), vec3(1.15, 1.31, 0.84), vec3(0.26, 0.52, 0.78)) * fog;
	col += vec3(0.79, 0.51, 0.32) * (it / 71.0) * 0.75;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
