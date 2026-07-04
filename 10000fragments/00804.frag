uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.63;
	float g = dot(sin(q * 2.66), cos(q.zxy * 2.66));
	return (abs(g) - 0.61) / (2.66 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.39);
	vec3 rd = normalize(vec3(p, 1.54));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = hue(tt * 0.26 + time * 0.19) * fog;
	col += vec3(0.52, 0.74, 0.52) * (it / 55.0) * 0.78;
	col *= 0.86 + 0.11 * sin(gl_FragCoord.y * 1.10 + time * 12.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
