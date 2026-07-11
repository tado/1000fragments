uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 15.71 - t * 2.23 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 28.04 - t * 1.84 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	p += vec2(-0.87, -0.06) * sin(length(p) * 4.09 - time * 1.27) * 0.12;
	p = rot2(1.12) * p;
	p.x += sin(p.y * 3.57 + time * 1.85) * 0.32;
	p = rot2(p.y * -2.56 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.88, 0.83, 0.45) * (0.14 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
