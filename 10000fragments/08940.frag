uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.97;
	float g = dot(sin(q * 1.51), cos(q.zxy * 1.51));
	return (abs(g) - 0.66) / (1.51 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.33);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = hue(tt * 0.13 + time * 0.25) * fog;
	col += vec3(0.74, 0.50, 0.92) * (it / 56.0) * 0.34;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
