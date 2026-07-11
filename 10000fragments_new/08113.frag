uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.89;
	float g = dot(sin(q * 3.84), cos(q.zxy * 3.84));
	return (abs(g) - 0.39) / (3.84 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 1.33));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.12 + time * 0.36, vec3(0.46, 0.60, 0.45), vec3(0.47, 0.48, 0.36), vec3(0.99, 1.27, 1.26), vec3(0.03, 0.10, 0.54)) * fog;
	col += vec3(0.72, 0.87, 0.62) * (it / 66.0) * 0.94;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
