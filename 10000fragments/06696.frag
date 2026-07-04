uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.74;
	float g = dot(sin(q * 2.87), cos(q.zxy * 2.87));
	return (abs(g) - 0.61) / (2.87 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.91);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = hue(tt * 0.14 + time * 0.13) * fog;
	col += vec3(0.81, 0.44, 0.96) * (it / 68.0) * 0.82;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
