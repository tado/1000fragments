uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.79) * (0.42 + 0.90 * h1) + fi * 2.39), cos((time * 0.79) * (0.71 + 0.97 * h2) + fi * 1.73)) * 0.76;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p += vec2(sin((time * 0.79) * 0.60), cos((time * 0.79) * 0.74)) * 0.16;
	vec3 col = vec3(0.011, 0.007, 0.058);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + fi * 0.70 + (time * 0.79) * 0.59)) * (0.0053 / (length(p - na) + 0.023));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.80){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + ll * 1.24 + (time * 0.79) * 0.70)) * (0.0019 / (sd + 0.011)) * (1.0 - ll / 0.80);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.17 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(1.029, 0.978, 1.001) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
