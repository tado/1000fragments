uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.82) * (0.39 + 0.45 * h1) + fi * 2.39), cos((time * 0.82) * (0.77 + 1.05 * h2) + fi * 1.73)) * 0.69;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.82) * 0.82), cos((time * 0.82) * 1.15)) * 0.11;
	p = rot2((time * 0.82) * -0.57) * p;
	vec3 col = vec3(0.022, 0.013, 0.040);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.51, 1.03) + fi * 1.35 + (time * 0.82) * 0.57)) * (0.0082 / (length(p - na) + 0.011));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.86){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.65, 0.50, 0.48) * (0.0014 / (sd + 0.020)) * (1.0 - ll / 0.86);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.991, 0.925) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
