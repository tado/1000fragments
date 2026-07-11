uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.26;
	float g = dot(sin(q * 3.74), cos(q.zxy * 3.74));
	return (abs(g) - 0.39) / (3.74 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.56);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.13 + time * 0.39, vec3(0.55, 0.45, 0.54), vec3(0.50, 0.44, 0.44), vec3(1.15, 1.08, 1.12), vec3(0.96, 0.45, 0.80)) * fog;
	col += vec3(0.76, 0.64, 0.78) * (it / 67.0) * 0.30;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
