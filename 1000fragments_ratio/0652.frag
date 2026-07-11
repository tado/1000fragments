uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.85) * (0.69 + 0.85 * h1) + fi * 2.39), cos((time * 0.85) * (0.75 + 1.13 * h2) + fi * 1.73)) * 0.59;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	p += vec2(sin((time * 0.85) * 1.15), cos((time * 0.85) * 0.91)) * 0.20;
	vec3 col = vec3(0.030, 0.025, 0.063);
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.14, 2.27) + fi * 0.58 + (time * 0.85) * 0.27)) * (0.0074 / (length(p - na) + 0.014));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.09){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.27, 0.76, 0.78) * (0.0022 / (sd + 0.016)) * (1.0 - ll / 1.09);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.921, 0.966, 1.052) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
