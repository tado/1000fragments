uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.26 + t * 0.79 + ph) + sin(p.y * 6.43 - t * 0.79 + ph)
        + sin((p.x + p.y) * 9.56 + t * 0.79 + ph) + sin(length(p) * 16.01 - t * 0.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.66;
	p = rot2(0.48) * p;
	p = rot2(time * -1.19) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.24, 0.09), vec3(0.54, 0.82, 0.40), d);
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
