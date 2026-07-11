uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.99;
	float g = dot(sin(q * 1.52), cos(q.zxy * 1.52));
	return (abs(g) - 0.40) / (1.52 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.79);
	vec3 rd = normalize(vec3(p, 1.79));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.35 + time * 0.04, vec3(0.55, 0.53, 0.41), vec3(0.30, 0.48, 0.47), vec3(1.40, 0.81, 1.25), vec3(0.43, 0.74, 0.37)) * fog;
	col += vec3(0.87, 0.36, 0.40) * (it / 72.0) * 0.51;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
