uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	float g = dot(sin(q * 1.98), cos(q.zxy * 1.98));
	return (abs(g) - 0.41) / (1.98 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.60);
	vec3 rd = normalize(vec3(p, 1.33));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.30 + time * 0.06, vec3(0.59, 0.54, 0.59), vec3(0.44, 0.41, 0.36), vec3(1.35, 0.91, 1.00), vec3(0.74, 0.96, 0.59)) * fog;
	col += vec3(0.35, 0.83, 0.50) * (it / 48.0) * 0.46;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
