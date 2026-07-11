uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.69) * (0.47 + 0.87 * h1) + fi * 2.39), cos((time * 0.69) * (0.70 + 0.32 * h2) + fi * 1.73)) * 0.67;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.69) * 0.62) * p;
	vec3 col = vec3(0.036, 0.031, 0.036);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + fi * 1.09 + (time * 0.69) * 0.25)) * (0.0043 / (length(p - na) + 0.016));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.06){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.05, 2.10) + ll * 3.39 + (time * 0.69) * 0.34)) * (0.0011 / (sd + 0.010)) * (1.0 - ll / 1.06);
			}
		}
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.005, 0.995, 0.993) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
