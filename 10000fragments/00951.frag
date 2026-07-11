uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.47 + t * 4.27 + ph) + sin(p.y * 6.40 - t * 4.27 + ph)
        + sin((p.x + p.y) * 9.21 + t * 4.27 + ph) + sin(length(p) * 3.81 - t * 4.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	p += vec2(-0.82, -0.79) * sin(length(p) * 2.94 - time * 0.89) * 0.31;
	p = rot2(time * -1.01) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.32, 0.12), vec3(0.54, 0.70, 0.73), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
