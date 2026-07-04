uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.45;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.63; kp = rot2(2.29) * kp; kp *= 1.37; }
    v = sin(kp.x * 2.90 - t * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.20;
	p *= 1.0 + 0.24 * sin(time * 2.47);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.49));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
