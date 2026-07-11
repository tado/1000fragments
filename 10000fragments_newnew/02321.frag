uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.58 + 0.38 * h1) + fi * 2.39), cos(time * (0.71 + 0.81 * h2) + fi * 1.73)) * 0.57;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * 1.11) * p;
	vec3 col = vec3(0.031, 0.018, 0.053);
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.82 + time * 0.21)) * (0.0059 / (length(p - na) + 0.025));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.09){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 2.58 + time * 0.53)) * (0.0021 / (sd + 0.019)) * (1.0 - ll / 1.09);
			}
		}
	}
	col = col / (1.0 + col);
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
