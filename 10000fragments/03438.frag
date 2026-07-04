uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.46;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.77; kp = rot2(2.63) * kp; kp *= 1.42; }
    v = sin(kp.y * 1.13 - t * 1.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	p += vec2(0.83, -0.58) * sin(length(p) * 3.34 - time * 1.11) * 0.27;
	p = rot2(time * 0.31) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(0.97) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
