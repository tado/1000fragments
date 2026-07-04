uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.71;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.75; kp = rot2(2.77) * kp; kp *= 1.41; }
    v = sin(kp.x * 3.16 - t * 1.49 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.97; }
	{ p = vec2(atan(p.y, p.x) * 2.55, length(p) * 4.20 - time * 0.95); }
	p = abs(p);
	p = rot2(p.y * 3.83 + time * 0.38) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.15, 0.48, 0.71) * (0.13 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
