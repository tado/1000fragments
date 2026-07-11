uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.71) * (0.43 + 0.43 * h1) + fi * 2.39), cos((time * 0.71) * (0.62 + 0.40 * h2) + fi * 1.73)) * 0.92;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.77;
	p = rot2((time * 0.71) * 1.00) * p;
	vec3 col = vec3(0.020, 0.033, 0.005);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.10, 2.21) + fi * 0.85 + (time * 0.71) * 0.81)) * (0.0074 / (length(p - na) + 0.016));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.80){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.38, 0.64, 0.32) * (0.0020 / (sd + 0.008)) * (1.0 - ll / 0.80);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.39 + (time * 0.71) * 6.85);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.916, 0.985, 1.028) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
