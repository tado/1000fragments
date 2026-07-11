uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.48;
	float g = dot(sin(q * 1.90), cos(q.zxy * 1.90));
	return (abs(g) - 0.49) / (1.90 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.44);
	vec3 rd = normalize(vec3(p, 0.95));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.15 + time * 0.23, vec3(0.55, 0.54, 0.40), vec3(0.34, 0.33, 0.38), vec3(1.15, 0.70, 0.88), vec3(0.31, 0.91, 0.19)) * fog;
	col += vec3(0.69, 0.39, 0.59) * (it / 71.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
