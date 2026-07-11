uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.33;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.70; kp = rot2(1.36) * kp; kp *= 1.19; }
    v = sin(kp.x * 1.87 - t * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.60) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 3.18;
	p += vec2(-0.38, 0.92) * sin(length(p) * 2.49 - time * 2.45) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.21, vec3(0.48, 0.52, 0.60), vec3(0.34, 0.41, 0.30), vec3(1.20, 0.77, 0.93), vec3(0.28, 0.65, 0.01));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
