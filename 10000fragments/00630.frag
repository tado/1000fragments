uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.75;
	float g = dot(sin(q * 2.50), cos(q.zxy * 2.50));
	return (abs(g) - 0.36) / (2.50 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.07);
	vec3 rd = normalize(vec3(p, 1.48));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.17 + time * 0.30, vec3(0.41, 0.57, 0.41), vec3(0.37, 0.45, 0.49), vec3(1.35, 0.80, 0.99), vec3(0.30, 0.79, 0.64)) * fog;
	col += vec3(0.41, 0.71, 0.27) * (it / 70.0) * 0.50;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
