uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.76) * (0.35 + 1.01 * h1) + fi * 2.39), cos((time * 0.76) * (0.78 + 0.38 * h2) + fi * 1.73)) * 0.67;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p.x = abs(p.x) - 0.54;
	vec3 col = vec3(0.028, 0.000, 0.032);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.22, 2.43) + fi * 1.02 + (time * 0.76) * 0.89)) * (0.0048 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.74){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.27, 0.27, 0.99) * (0.0019 / (sd + 0.012)) * (1.0 - ll / 0.74);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.968, 0.999, 0.936) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
