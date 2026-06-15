uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.76 + t * 1.84 + ph) + sin(p.y * 11.72 - t * 1.84 + ph)
        + sin((p.x + p.y) * 10.18 + t * 1.84 + ph) + sin(length(p) * 7.70 - t * 1.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = rot2(p.y * 3.17 + time * 0.38) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.21; p = rot2(1.67) * p; }
	p += vec2(-0.28, 0.43) * sin(length(p) * 4.06 - time * 1.87) * 0.38;
	p = rot2(length(p) * -2.23 + time * 0.52) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.46, 0.47, 0.44), vec3(0.83, 0.92, 0.88), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
