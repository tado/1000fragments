uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.62) * (0.31 + 0.67 * h1) + fi * 2.39), cos((time * 0.62) * (0.79 + 0.34 * h2) + fi * 1.73)) * 0.85;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.27 + (time * 0.62) * 0.69) * 0.13;
	p.x = abs(p.x);
	p = rot2((time * 0.62) * -1.47) * p;
	vec3 col = vec3(0.023, 0.007, 0.020);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + fi * 1.24 + (time * 0.62) * 0.15)) * (0.0116 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.95){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + ll * 3.15 + (time * 0.62) * 0.97)) * (0.0028 / (sd + 0.019)) * (1.0 - ll / 0.95);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.86 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.994, 1.036) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
