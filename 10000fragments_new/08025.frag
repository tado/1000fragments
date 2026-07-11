uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.63;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.52; kp = rot2(1.54) * kp; kp *= 1.38; }
    v = sin(kp.x * 2.29 - t * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	{ p = vec2(atan(p.y, p.x) * 1.84, length(p) * 5.79 - time * 0.60); }
	p = rot2(0.35) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.36, 0.10), vec3(0.56, 0.76, 0.55), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
