uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.78) * (0.48 + 0.47 * h1) + fi * 2.39), cos((time * 0.78) * (0.59 + 0.40 * h2) + fi * 1.73)) * 0.91;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	p += vec2(sin((time * 0.78) * 0.79), cos((time * 0.78) * 0.75)) * 0.14;
	vec3 col = vec3(0.028, 0.039, 0.006);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.62, 3.23) + fi * 1.31 + (time * 0.78) * 0.42)) * (0.0045 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.88){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.40, 0.40, 0.75) * (0.0026 / (sd + 0.013)) * (1.0 - ll / 0.88);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.014, 0.927) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
