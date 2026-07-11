uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.79) * (0.54 + 1.15 * h1) + fi * 2.39), cos((time * 0.79) * (0.52 + 0.62 * h2) + fi * 1.73)) * 0.66;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.79) * -1.07) * p;
	vec3 col = vec3(0.018, 0.014, 0.047);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.80, 1.61) + fi * 0.80 + (time * 0.79) * 0.33)) * (0.0089 / (length(p - na) + 0.021));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.05){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.91, 0.64, 1.00) * (0.0024 / (sd + 0.020)) * (1.0 - ll / 1.05);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.027, 0.931) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
