uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.20;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.45; kp = rot2(1.94) * kp; kp *= 1.32; }
    v = sin(kp.y * 2.88 - t * 1.47 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.31, length(p) * 2.97 - time * 0.54); }
	p = rot2(length(p) * 1.36 + time * 0.62) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.96; }
	p = fract(p * 1.72) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.14, 0.49), vec3(0.60, 0.74, 0.82), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
