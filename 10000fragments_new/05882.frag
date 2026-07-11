uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 35.04 - t * 4.94 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 32.10 - t * 5.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p = rot2(p.y * 1.67 + time * 0.37) * p;
	p = rot2(1.30) * p;
	p = fract(p * 1.78) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.41, 0.52, 0.82) * (0.21 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
