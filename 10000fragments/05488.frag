uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.06 + t * 4.70 + ph) + sin(p.y * 6.43 - t * 4.70 + ph)
        + sin((p.x + p.y) * 8.63 + t * 4.70 + ph) + sin(length(p) * 4.63 - t * 4.70 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.36) * p;
	p = abs(p);
	p *= 3.05;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.37, 0.10), vec3(0.97, 0.69, 0.48), d);
	col = mod(col * 1.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
