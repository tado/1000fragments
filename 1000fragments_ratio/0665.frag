uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.60) * (0.64 + 0.95 * h1) + fi * 2.39), cos((time * 0.60) * (0.74 + 0.87 * h2) + fi * 1.73)) * 0.65;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.60) * 0.45), cos((time * 0.60) * 0.95)) * 0.09;
	vec3 col = vec3(0.015, 0.038, 0.060);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.54, 3.07) + fi * 0.96 + (time * 0.60) * 0.18)) * (0.0042 / (length(p - na) + 0.021));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.01){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.54, 3.07) + ll * 1.52 + (time * 0.60) * 0.75)) * (0.0013 / (sd + 0.015)) * (1.0 - ll / 1.01);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.976, 1.009) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
