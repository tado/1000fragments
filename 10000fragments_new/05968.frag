uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.02;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.79; kp = rot2(0.73) * kp; kp *= 1.41; }
    v = sin(kp.y * 3.71 - t * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -1.99 + time * 0.29) * p;
	p *= 1.93;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.09 + time * 0.25);
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
