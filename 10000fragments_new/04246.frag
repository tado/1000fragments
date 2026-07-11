uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	float g = dot(sin(q * 3.25), cos(q.zxy * 3.25));
	return (abs(g) - 0.64) / (3.25 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.69);
	vec3 rd = normalize(vec3(p, 1.56));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.36 + time * 0.28, vec3(0.40, 0.59, 0.53), vec3(0.48, 0.35, 0.33), vec3(0.88, 1.24, 0.88), vec3(0.00, 0.38, 0.71)) * fog;
	col += vec3(0.97, 0.20, 0.37) * (it / 49.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
