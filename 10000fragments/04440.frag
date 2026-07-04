uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.04;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.46; kp = rot2(2.29) * kp; kp *= 1.38; }
    v = sin(kp.y * 1.25 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p.x += sin(p.y * 4.81 + time * 3.22) * 0.28;
	p *= 2.80;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.81;
	p = fract(p * 2.02) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.91, 0.16, 0.74) * (0.24 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
