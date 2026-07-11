uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.77 + sin(p.y * 5.49 + t * 4.29) * 2.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p = rot2(length(p) * 2.67 + time * 0.74) * p;
	p += vec2(-0.89, 0.69) * sin(length(p) * 5.33 - time * 1.66) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.44, 0.54, 0.18) * (0.17 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
