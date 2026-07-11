uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.94;
	float g = dot(sin(q * 3.02), cos(q.zxy * 3.02));
	return (abs(g) - 0.80) / (3.02 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.92);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.20 + time * 0.35, vec3(0.48, 0.42, 0.50), vec3(0.32, 0.32, 0.32), vec3(1.37, 1.31, 0.83), vec3(0.56, 0.63, 0.42)) * fog;
	col += vec3(0.65, 0.72, 0.43) * (it / 58.0) * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
