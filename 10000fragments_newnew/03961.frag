uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.64;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.50; kp = rot2(2.55) * kp; kp *= 1.45; }
    v = sin(kp.x * 2.91 - t * 2.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.38, 0.16), vec3(0.53, 0.60, 0.52), d);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 1.12 + time * 12.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
