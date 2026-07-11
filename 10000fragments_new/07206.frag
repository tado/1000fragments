uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 36.49 - t * 6.03 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 37.23 - t * 3.72 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	p.x += sin(p.y * 4.07 + time * 3.36) * 0.37;
	p = rot2(1.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.98, 0.31, 0.40) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
