uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.11 + t * 3.00 + ph) * 0.7;
    float wb = sin(p.y * 10.33 - t * 1.86 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.28;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.67) * p;
	p = rot2(p.y * -2.92 + time * 0.94) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.07, 0.55), vec3(0.91, 1.00, 0.76), d);
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 2.11 + time * 9.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
