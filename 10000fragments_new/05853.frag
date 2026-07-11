uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.84 + t * 4.33 + ph) + sin(p.y * 7.10 - t * 4.33 + ph)
        + sin((p.x + p.y) * 9.61 + t * 4.33 + ph) + sin(length(p) * 7.16 - t * 4.33 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p = rot2(p.y * -2.04 + time * 0.76) * p;
	p = abs(p) - 0.46;
	p = (floor(p * 19.2) + 0.5) / 19.2;
	p = rot2(1.88) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.37, 0.30, 0.23), vec3(0.88, 0.91, 0.55), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
