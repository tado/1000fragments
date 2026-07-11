uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.67 + t * 1.22 + ph) + sin(p.y * 12.65 - t * 1.22 + ph)
        + sin((p.x + p.y) * 6.06 + t * 1.22 + ph) + sin(length(p) * 12.05 - t * 1.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	p = rot2(p.y * 1.42 + time * 0.85) * p;
	p += vec2(0.97, -0.33) * sin(length(p) * 2.59 - time * 0.67) * 0.11;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.27, 0.44), vec3(0.62, 0.71, 0.93), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
