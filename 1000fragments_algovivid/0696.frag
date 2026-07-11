uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.63) * (0.69 + 0.52 * h1) + fi * 2.39), cos((time * 0.63) * (0.53 + 0.84 * h2) + fi * 1.73)) * 0.75;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y = abs(p.y) - 0.52;
	p *= 1.05;
	p = rot2((time * 0.63) * 0.74) * p;
	vec3 col = vec3(0.012, 0.024, 0.014);
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + fi * 0.96 + (time * 0.63) * 0.51)) * (0.0098 / (length(p - na) + 0.020));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.04){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + ll * 1.70 + (time * 0.63) * 0.22)) * (0.0025 / (sd + 0.017)) * (1.0 - ll / 1.04);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.961, 1.024) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
