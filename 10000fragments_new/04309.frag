uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.49;
	float g = dot(sin(q * 3.53), cos(q.zxy * 3.53));
	return (abs(g) - 0.35) / (3.53 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.96);
	vec3 rd = normalize(vec3(p, 1.27));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.22 + time * 0.00, vec3(0.52, 0.44, 0.42), vec3(0.39, 0.45, 0.36), vec3(1.01, 1.16, 0.80), vec3(0.56, 0.97, 0.99)) * fog;
	col += vec3(0.69, 0.75, 0.80) * (it / 71.0) * 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
