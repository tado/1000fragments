uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.95 + sr * 17.58 - t * 3.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.74, -0.08) * sin(length(p) * 3.30 - time * 0.92) * 0.36;
	p *= 2.71;
	p = rot2(length(p) * 2.76 + time * 0.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.01, 1.24, 1.05) + vec3(0.28, 0.27, 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
