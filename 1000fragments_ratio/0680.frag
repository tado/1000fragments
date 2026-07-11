uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.64) * (0.76 + 0.97 * h1) + fi * 2.39), cos((time * 0.64) * (0.63 + 0.32 * h2) + fi * 1.73)) * 0.71;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.20;
	p = rot2((time * 0.64) * -0.64) * p;
	vec3 col = vec3(0.003, 0.035, 0.005);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.54) + fi * 0.54 + (time * 0.64) * 0.65)) * (0.0099 / (length(p - na) + 0.022));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.93){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.32, 0.59, 0.37) * (0.0019 / (sd + 0.013)) * (1.0 - ll / 0.93);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.970, 1.021) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
